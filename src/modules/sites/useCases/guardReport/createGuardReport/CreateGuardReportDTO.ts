
import { UserId } from "../../../../users/domain/userId";
import { SiteId } from "../../../domain/siteId";

export interface CreateGuardReportDTO {

   siteId:SiteId,
   userId:UserId,
   startDate: Date;
   endDate: Date;
   sentDate?: Date;
   recipient?: string;
   
  }