

export interface UpdateIncidentReportDTO  {
    incidentReportId: string;
    siteId?: string;
    userId?: string;
    timeOfIncident?: Number;
    incidentType?: string;
    incidentDescription?: string;
    photos?: string[];
    videos?: string[];
     
    }