import { UserId } from '../../users/domain/userId';
import { ReportId } from '../domain/ReportId';
import { IncidentReport } from '../domain/incidentReport';
import { SiteId } from '../domain/siteId';

export interface IIncidentReportRepo {
  save(incidentReport: IncidentReport): Promise<void>;
  delete(incidentId: ReportId): Promise<void>;
  update(incidentId: ReportId, incidentReport: IncidentReport): Promise<void>;
  getAllByUserId(userId: UserId): Promise<[IncidentReport] | IncidentReport>;  
  getAllBySiteId(siteId: SiteId): Promise<[IncidentReport] | IncidentReport>;
  getByIncidentReportId(incidentId: ReportId): Promise<[IncidentReport]|IncidentReport>;
}
