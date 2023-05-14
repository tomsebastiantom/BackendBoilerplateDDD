import { IIncidentReportRepo } from '../incidentReportRepo';
import { IncidentReportMap } from '../../mappers/incidentReportMap';
import { IncidentReport } from '../../domain/incidentReport';
import { ReportId } from '../../domain/ReportId';
import { SiteId } from '../../domain/siteId';
import { UserId } from '../../../users/domain/userId';

export class PrismaIncidentReportRepo implements IIncidentReportRepo {
  private models: any;
  constructor(models: any) {
    this.models = models;
  }

  async save(incidentReport: IncidentReport): Promise<void> {
    const IncidentReportModel = this.models.incidentReports;
    const rawIncidentReports = IncidentReportMap.toPersistence(incidentReport);
    await IncidentReportModel.create({ data: { ...rawIncidentReports } });
    return;
  }
  async delete(incidentId: string): Promise<void> {
    const IncidentReportModel = this.models.incidentReports;
    await IncidentReportModel.destroy({ where: { id: incidentId} });
  }

  async update(
    incidentId: string,
    incidentReport: IncidentReport
  ): Promise<void> {
    const IncidentReportModel = this.models.incidentReports;
    const rawIncidentReport = IncidentReportMap.toPersistence(incidentReport);
    await IncidentReportModel.update({
      data: { ...rawIncidentReport },
      where: { IncidentReportId: incidentId }
    });
    return;
  }
  async getByIncidentReportId(incidentId: string): Promise<IncidentReport> {
    const IncidentReportModel = this.models.incidentReports;
    const rawIncidentReport = await IncidentReportModel.findUnique({
      where: { IncidentReportId: incidentId }
    });
    const IncidentReport = IncidentReportMap.toDomain(rawIncidentReport);
    return IncidentReport;
  }
  async getBySiteId(
    siteId: string
  ): Promise<IncidentReport[]|IncidentReport> {
    const IncidentReportModel = this.models.incidentReports;
    const rawIncidentReport = await IncidentReportModel.findMany({
      where: { siteId: siteId }
    });
    if (Array.isArray(rawIncidentReport)) {
      const incidentReport = rawIncidentReport.map((rawIncidentReport) =>
        IncidentReportMap.toDomain(rawIncidentReport)
      );
      return incidentReport;
    } else {
      const incidentReport = IncidentReportMap.toDomain(rawIncidentReport);
      return incidentReport;
    }
  }
  async getByUserId(
    userId: string
  ): Promise<IncidentReport[]|IncidentReport> {
    const IncidentReportModel = this.models.incidentReports;
    const rawIncidentReport = await IncidentReportModel.findMany({
      where: { userId: userId }
    });
    //check if  rawIncidentReport is an array or not
    if (Array.isArray(rawIncidentReport)) {
      const incidentReport = rawIncidentReport.map((rawIncidentReport) =>
        IncidentReportMap.toDomain(rawIncidentReport)
      );
      return incidentReport;
    } else {
      const incidentReport = IncidentReportMap.toDomain(rawIncidentReport);
      return incidentReport;
    }
  }
}
