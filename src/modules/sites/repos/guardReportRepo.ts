import { UserId } from "../../users/domain/userId"
import { GuardReport } from "../domain/guardReport"
import { ReportId } from "../domain/ReportId"
import { SiteId } from "../domain/siteId"


export interface IGuardReportRepo {
    save (guardReport: GuardReport): Promise<void>
    delete (guardReportId:ReportId): Promise<void>
    getAllBySiteId (siteId:SiteId): Promise<[GuardReport]> 
    update (guardReportId: ReportId, guardReport: GuardReport): Promise<void>
    getByGuardReportId (guardReportId: ReportId): Promise<GuardReport>   
    getByUserId(userId: UserId): Promise<GuardReport>
}