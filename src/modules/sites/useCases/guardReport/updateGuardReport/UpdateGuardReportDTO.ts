export interface UpdateGuardReportDTO {
  guardReportId: string;
  siteId?: String;
  userId?:String;  
  startTimestamp?:Number; 
  endTimestamp?:Number;
  sendTimestamp?:Number;
  recipient?: string;
  
 }