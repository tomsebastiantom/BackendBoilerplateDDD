
export interface IncidentReportDTO {
  siteId: string;
  userId: string;
  timeOfIncident: number;
  incidentType: string;
  incidentDescription: string;
  photos?: string[];
  videos?: string[];
}
