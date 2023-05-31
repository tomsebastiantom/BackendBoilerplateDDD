import { GuardReport } from '../../domain/guardReport';
import { GuardReportMap } from '../../mappers/guardReportMap';
import { IGuardReportRepo } from '../guardReportRepo';

export class PrismaGuardReportRepo implements IGuardReportRepo {
  private models: any;
  constructor(models: any) {
    this.models = models;
  }

  async save(guardReport: GuardReport): Promise<void> {
    const GuardReportModel = this.models.guardreports;
    const rawguardReport = GuardReportMap.toPersistence(guardReport);
    await GuardReportModel.create({ data: { ...rawguardReport } });
  }
  async delete(guardReportId: string): Promise<void> {
    const GuardReportModel = this.models.guardreports;
    await GuardReportModel.delete({ where: { id: guardReportId } });
  }
  async deleteBySiteId(siteId: string): Promise<void> {
    const GuardReportModel = this.models.guardreports;
    await GuardReportModel.deleteMany({ where: { siteId: siteId } });
  }

  async getBySiteId(siteId: string): Promise<GuardReport | GuardReport[]> {
    const GuardReportModel = this.models.guardreports;
    const rawGuardReport = await GuardReportModel.findMany({
      where: { siteId: siteId }
    });
    if (Array.isArray(rawGuardReport)) {
      const guardReport = rawGuardReport.map((rawGuardReport) =>
        GuardReportMap.toDomain(rawGuardReport)
      );
      return guardReport;
    } else {
      const guardReport = GuardReportMap.toDomain(rawGuardReport);
      return guardReport;
    }
  }
  async update(guardReportId: string, guardReport: GuardReport): Promise<void> {
    const GuardReportModel = this.models.guardreports;
    const rawGuardReport = GuardReportMap.toPersistence(guardReport);
    await GuardReportModel.update(
      { data: { ...rawGuardReport } },
      {
        where: { id: guardReportId }
      }
    );
  }
  async getByGuardReportId(guardReportId: string): Promise<GuardReport> {
    const GuardReportModel = this.models.guardreports;
    const rawGuardReport = await GuardReportModel.findUnique({
      where: { id: guardReportId }
    });
    const guardReport = GuardReportMap.toDomain(rawGuardReport);
    return guardReport;
  }
  async getByUserId(userId: string): Promise<GuardReport | GuardReport[]> {
    const GuardReportModel = this.models.guardreports;
    const rawGuardReport = await GuardReportModel.findMany({
      where: { userId: userId }
    });

    if (Array.isArray(rawGuardReport)) {
      const guardReport = rawGuardReport.map((rawGuardReport) =>
        GuardReportMap.toDomain(rawGuardReport)
      );
      return guardReport;
    } else {
      const guardReport = GuardReportMap.toDomain(rawGuardReport);
      return guardReport;
    }
  }
}
