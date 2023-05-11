import { SiteId } from '../domain/siteId';
import { UserId } from '../../users/domain/userId';

export interface IncidentReportDTO {
  siteId: SiteId;
  userId: UserId;
  timeOfIncident: Number;
  incidentType: string;
  incidentDescription: string;
  photos?: [string];
  videos?: [string];
}
