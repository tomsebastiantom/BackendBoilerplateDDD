

export interface GuardReportDTO {
  siteId?: string;
  userId:string;  
  startTimestamp:number; 
  endTimestamp:number;
  sendTimestamp?:number;
  recipient?: string;
}



//recipent is email