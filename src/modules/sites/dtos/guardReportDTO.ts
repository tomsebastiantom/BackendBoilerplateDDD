

export interface GuardReportDTO {
  siteId?: String;
  userId:String;  
  startTimestamp:Number; 
  endTimestamp:Number;
  sendTimestamp?:Number;
  recipient?: string;
}



//recipent is email