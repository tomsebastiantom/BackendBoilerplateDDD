import { GuardReport } from '../../domain/guardReport';
import { SiteId } from '../../domain/siteId';
import { ReportId } from '../../domain/ReportId';
import { GuardReportMap } from '../../mappers/guardReportMap';
import { IGuardReportRepo } from '../guardReportRepo';
import { UserId } from '../../../users/domain/userId';

export class PrismaGuardReportRepo implements IGuardReportRepo {
  private models: any;
  constructor(models: any) {
    this.models = models;
  }

  async save(guardReport: GuardReport): Promise<void> {
    const GuardReportModel = this.models.guardReports;
    const rawguardReport = GuardReportMap.toPersistence(guardReport);
    await GuardReportModel.create({ data: { ...rawguardReport } });
  }
  async delete(guardReportId: ReportId): Promise<void> {
    const GuardReportModel = this.models.guardReports;
    await GuardReportModel.destroy({ where: { id: guardReportId.id } });
  }

  async getAllBySiteId(siteId: SiteId): Promise<[GuardReport]> {
    const GuardReportModel = this.models.guardReports;
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
    const GuardReportModel = this.models.guardReports;
    const rawGuardReport = GuardReportMap.toPersistence(guardReport);
    await GuardReportModel.update(rawGuardReport, {
      where: { id: guardReportId.id }
    });
  }
  async getByGuardReportId(guardReportId: ReportId): Promise<GuardReport> {
    const GuardReportModel = this.models.guardReports;
    const rawGuardReport = await GuardReportModel.findUnique({
      where: { id: guardReportId.id }
    });
    const GuardReport = GuardReportMap.toDomain(rawGuardReport);
    return GuardReport;
  }
  async getByUserId(userId: UserId): Promise<GuardReport> {
    const GuardReportModel = this.models.guardReports;
    const rawGuardReport = await GuardReportModel.findAll({
      where: { userId: userId.id }
    });
    const GuardReport = GuardReportMap.toDomain(rawGuardReport);
    return GuardReport;
  }
}
