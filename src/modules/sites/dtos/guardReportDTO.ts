
import { SiteId } from '../domain/siteId';
import { UserId } from '../../users/domain/userId';

export interface GuardReportDTO {
  siteId?: SiteId;
  userId:UserId;  
  startTimestamp:Number; 
  endTimestamp:Number;
  sendTimestamp?:Number;
  recipient?: string;
}



//recipent is email