import { IIncidentReportRepo } from '../incidentReportRepo';
import { IncidentReportMap } from '../../mappers/incidentReportMap';
import { IncidentReport } from '../../domain/incidentReport';

export class PrismaIncidentReportRepo implements IIncidentReportRepo {
  private models: any;
  constructor(models: any) {
    this.models = models;
  }

  async save(incidentReport: IncidentReport): Promise<void> {
    const IncidentReportModel = this.models.incidentreports;
    const rawIncidentReports = IncidentReportMap.toPersistence(incidentReport);
    await IncidentReportModel.create({ data: { ...rawIncidentReports } });
    return;
  }
  async delete(incidentId: string): Promise<void> {
    const IncidentReportModel = this.models.incidentreports;
    await IncidentReportModel.delete({ where: { id: incidentId } });
  }

  async update(
    incidentId: string,
    incidentReport: IncidentReport
  ): Promise<void> {
    const IncidentReportModel = this.models.incidentreports;
    const rawIncidentReport = IncidentReportMap.toPersistence(incidentReport);
    await IncidentReportModel.update({
      data: { ...rawIncidentReport },
      where: { IncidentReportId: incidentId }
    });
    return;
  }
  async getByIncidentReportId(incidentId: string): Promise<IncidentReport> {
    const IncidentReportModel = this.models.incidentreports;
    const rawIncidentReport = await IncidentReportModel.findUnique({
      where: { IncidentReportId: incidentId }
    });
    const IncidentReport = IncidentReportMap.toDomain(rawIncidentReport);
    return IncidentReport;
  }
  async getBySiteId(
    siteId: string
  ): Promise<IncidentReport[] | IncidentReport> {
    const IncidentReportModel = this.models.incidentreports;
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
  ): Promise<IncidentReport[] | IncidentReport> {
    const IncidentReportModel = this.models.incidentreports;
    const rawIncidentReport = await IncidentReportModel.findMany({
      where: { userId: userId }
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
}
