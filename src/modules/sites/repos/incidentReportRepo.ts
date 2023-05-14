import { IncidentReport } from '../domain/incidentReport';


export interface IIncidentReportRepo {
  save(incidentReport: IncidentReport): Promise<void>;
  delete(incidentId: string): Promise<void>;
  update(incidentId: string, incidentReport: IncidentReport): Promise<void>;
  getByUserId(userId: string): Promise<IncidentReport[] | IncidentReport>;  
  getBySiteId(siteId: string): Promise<IncidentReport[] | IncidentReport>;
  getByIncidentReportId(incidentId: string): Promise<IncidentReport[]|IncidentReport>;
}
