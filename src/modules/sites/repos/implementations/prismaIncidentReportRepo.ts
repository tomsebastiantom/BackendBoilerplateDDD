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
  async delete(incidentId: ReportId): Promise<void> {
    const IncidentReportModel = this.models.incidentReports;
    await IncidentReportModel.destroy({ where: { id: incidentId.id } });
  }

  async update(
    incidentId: ReportId,
    incidentReport: IncidentReport
  ): Promise<void> {
    const IncidentReportModel = this.models.incidentReports;
    const rawIncidentReport = IncidentReportMap.toPersistence(incidentReport);
    await IncidentReportModel.update(rawIncidentReport, {
      where: { IncidentReportId: incidentId.id }
    });
    return;
  }
  async getByIncidentReportId(incidentId: ReportId): Promise<IncidentReport> {
    const IncidentReportModel = this.models.incidentReports;
    const rawIncidentReport = await IncidentReportModel.findUnique({
      where: { IncidentReportId: incidentId.id }
    });
    const IncidentReport = IncidentReportMap.toDomain(rawIncidentReport);
    return IncidentReport;
  }
  async getAllBySiteId(
    siteId: SiteId
  ): Promise<[IncidentReport] | IncidentReport> {
    const IncidentReportModel = this.models.incidentReports;
    const rawIncidentReport = await IncidentReportModel.findAll({
      where: { siteId: siteId.id }
    });
    //check if exist or if an array

    const IncidentReport = IncidentReportMap.toDomain(rawIncidentReport);
    return IncidentReport;
  }
  async getAllByUserId(
    userId: UserId
  ): Promise<[IncidentReport] | IncidentReport> {
    const IncidentReportModel = this.models.incidentReports;
    const rawIncidentReport = await IncidentReportModel.findAll({
      where: { userId: userId.id }
    });
    //check if exist or if an array

    const IncidentReport = IncidentReportMap.toDomain(rawIncidentReport);
    return IncidentReport;
  }
}
