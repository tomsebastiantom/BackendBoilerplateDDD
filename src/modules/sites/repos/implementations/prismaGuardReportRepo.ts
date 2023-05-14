import { GuardReport } from '../../domain/guardReport';

import { ReportId } from '../../domain/ReportId';
import { GuardReportMap } from '../../mappers/guardReportMap';
import { IGuardReportRepo } from '../guardReportRepo';

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
  async delete(guardReportId: string): Promise<void> {
    const GuardReportModel = this.models.guardReports;
    await GuardReportModel.destroy({ where: { id: guardReportId } });
  }

  async getBySiteId(siteId: string): Promise<GuardReport | GuardReport[]> {
    const GuardReportModel = this.models.guardReports;
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
  async update(
    guardReportId: string,
    guardReport: GuardReport
  ): Promise<void> {
    const GuardReportModel = this.models.guardReports;
    const rawGuardReport = GuardReportMap.toPersistence(guardReport);
    await GuardReportModel.update(
      { data: { ...rawGuardReport } },
      {
        where: { id: guardReportId }
      }
    );
  }
  async getByGuardReportId(guardReportId: string): Promise<GuardReport> {
    const GuardReportModel = this.models.guardReports;
    const rawGuardReport = await GuardReportModel.findUnique({
      where: { id: guardReportId }
    });
    const guardReport = GuardReportMap.toDomain(rawGuardReport);
    return guardReport;
  }
  async getByUserId(userId: string): Promise<GuardReport | GuardReport[]> {
    const GuardReportModel = this.models.guardReports;
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
