
export interface IncidentReportDTO {
  siteId: String;
  userId: String;
  timeOfIncident: Number;
  incidentType: string;
  incidentDescription: string;
  photos?: string[];
  videos?: string[];
}
