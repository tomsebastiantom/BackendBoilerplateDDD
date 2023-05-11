import { GuardReport } from '../../domain/guardReport';
import { SiteId } from '../../domain/siteId';
import { ReportId } from '../../domain/ReportId';
import { GuardReportMap } from '../../mappers/guardReportMap';
import { IGuardReportRepo } from '../guardReportRepo';

export class SequelizeGuardReportRepo implements IGuardReportRepo {
  private models: any;
  constructor(models: any) {
    this.models = models;
  }

   async save(guardReport: GuardReport): Promise<void> {
    const GuardReportModel = this.models.GuardReport;

    const rawguardReport = GuardReportMap.toPersistence(guardReport);
    await GuardReportModel.create(rawguardReport);
  }
  async delete(guardReportId: ReportId): Promise<void> {
    const GuardReportModel = this.models.GuardReport;
    await GuardReportModel.destroy({ where: { reportid: guardReportId.id } });
  }

  async getAllBySiteId(siteId: SiteId): Promise<[GuardReport]> {
    const GuardReportModel = this.models.GuardReport;
    const rawGuardReports = await GuardReportModel.findAll({
      where: { siteId: siteId.id }
    });
    const GuardReports = rawGuardReports.map((rawGuardReport) =>
      GuardReportMap.toDomain(rawGuardReport)
    );
    return GuardReports;
  }
  async update(
    guardReportId: ReportId,
    guardReport: GuardReport
  ): Promise<void> {
    const GuardReportModel = this.models.GuardReport;
    const rawGuardReport = GuardReportMap.toPersistence(guardReport);
    await GuardReportModel.update(rawGuardReport, {
      where: { reportId: guardReportId.id }
    });
  }
  async getByGuardReportId(guardReportId: ReportId): Promise<GuardReport> {
    const GuardReportModel = this.models.GuardReport;
    const rawGuardReport = await GuardReportModel.findOne({
      where: { reportId: guardReportId.id }
    });
    const GuardReport = GuardReportMap.toDomain(rawGuardReport);
    return GuardReport;
  }
}
