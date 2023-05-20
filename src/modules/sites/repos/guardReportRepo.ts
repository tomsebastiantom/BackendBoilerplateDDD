import { GuardReport } from '../domain/guardReport';

export interface IGuardReportRepo {
  save(guardReport: GuardReport): Promise<void>;
  delete(guardReportId: string): Promise<void>;
  deleteBySiteId(siteId: string): Promise<void>;
  getBySiteId(siteId: string): Promise<GuardReport|GuardReport[]>;
  update(guardReportId: string, guardReport: GuardReport): Promise<void>;
  getByGuardReportId(guardReportId: string): Promise<GuardReport>;
  getByUserId(userId: string): Promise<GuardReport|GuardReport[]>;
}
