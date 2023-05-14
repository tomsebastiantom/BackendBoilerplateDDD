

export interface CreateGuardReportDTO {

   siteId?: String;
   userId:String;  
   startTimestamp:Number; 
   endTimestamp:Number;
   sendTimestamp?:Number;
   recipient?: string;
   
  }