import { Mapper } from '../../../shared/infra/Mapper';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { IncidentReport } from '../domain/incidentReport';
import { IncidentReportDTO } from '../dtos/incidentReportDTO';
import { UserId } from '../../users/domain/userId';
import { SiteId } from '../domain/siteId';

export class IncidentReportMap implements Mapper<IncidentReport> {
  public static toDomain(raw: any): IncidentReport {
    const incidentReportOrError = IncidentReport.create(
      {
        siteId: SiteId.create(raw.siteId).getValue(),
        userId: UserId.create(raw.userId).getValue(),
        timeOfIncident: raw.timeOfIncident,
        incidentType: raw.incidentType,
        incidentDescription: raw.incidentDescription,
        photos: raw.photos,
        videos: raw.videos
      },
      new UniqueEntityID(raw.id)
    );
    incidentReportOrError.isFailure
      ? console.log(incidentReportOrError.getErrorValue())
      : '';

    return incidentReportOrError.isSuccess
      ? incidentReportOrError.getValue()
      : null;
  }

  public static toPersistence(incidentReport: IncidentReport): any {
    return {
      id: incidentReport.incidentId.id.toString(),
      siteId: incidentReport.siteId.toString(),
      userId: incidentReport.userId.toString(),
      timeOfIncident: incidentReport.timeOfIncident,
      incidentType: incidentReport.incidentType,
      incidentDescription: incidentReport.incidentDescription,
      photos: incidentReport.photos,
      videos: incidentReport.videos
    };
  }

  public static toDTO(incidentReport: IncidentReport): IncidentReportDTO {
    return {
      siteId: incidentReport.siteId,
      userId: incidentReport.userId,
      timeOfIncident: incidentReport.timeOfIncident,
      incidentType: incidentReport.incidentType,
      incidentDescription: incidentReport.incidentDescription,
      photos: incidentReport.photos,
      videos: incidentReport.videos
    };
  }
}
