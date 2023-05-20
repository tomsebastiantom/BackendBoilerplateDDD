

export interface CreateIncidentReportDTO {

  siteId: string;
  userId: string;
  timeOfIncident: Number;
  incidentType: string;
  incidentDescription: string;
  photos?: string[];
  videos?: string[];
   
  }