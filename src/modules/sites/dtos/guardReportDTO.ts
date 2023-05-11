
import { SiteId } from '../domain/siteId';
import { UserId } from '../../users/domain/userId';

export interface GuardReportDTO {
  siteId?: SiteId;
  userId:UserId;  
  startTimestamp:Date; 
  endTimestamp:Date;
  sendTimestamp?:Date;
  recipient?: string;
}



//recipent is email