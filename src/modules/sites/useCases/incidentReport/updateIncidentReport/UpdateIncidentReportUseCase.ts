import { AppError } from '../../../../../shared/core/AppError';
import { Either, left, Result, right } from '../../../../../shared/core/Result';
import { UseCase } from '../../../../../shared/core/UseCase';
import { UniqueEntityID } from '../../../../../shared/domain/UniqueEntityID';
import { IncidentReport } from '../../../domain/incidentReport';
import { IIncidentReportRepo } from '../../../repos/incidentReportRepo';
import { UpdateIncidentReportDTO } from './UpdateIncidentReportDTO';
import { UpdateIncidentReportErrors } from './UpdateIncidentReportErrors';
import { UpdateIncidentReportResponse } from './UpdateIncidentReportResponse';

export class UpdateIncidentReportUseCase
  implements
    UseCase<UpdateIncidentReportDTO, Promise<UpdateIncidentReportResponse>>
{
  private incidentReportRepo: IIncidentReportRepo;

  constructor(incidentReportRepo: IIncidentReportRepo) {
    this.incidentReportRepo = incidentReportRepo;
  }

  public async execute(
    request: UpdateIncidentReportDTO
  ): Promise<UpdateIncidentReportResponse> {
    try {
      const incidentReport: IncidentReport =
        await this.incidentReportRepo.getByIncidentReportId(
          request.incidentReportId
        );
      if (!incidentReport) {
        return left(
          new UpdateIncidentReportErrors.IncidentReportIdNotValidError(
            request.incidentReportId
          )
        ) as UpdateIncidentReportResponse;
      }
      let newIncidentReport: any = {
        ...incidentReport
      };

      if (request.userId) {
        newIncidentReport.userId = request.userId;
      }
      if (request.siteId) {
        newIncidentReport.siteId = request.siteId;
      }
      if (request.timeOfIncident) {
        newIncidentReport.timeOfIncident = request.timeOfIncident;
      }
      if (request.incidentDescription) {
        newIncidentReport.incidentDescription = request.incidentDescription;
      }
      if (request.incidentType) {
        newIncidentReport.incidentType = request.incidentType;
      }
      if (request.photos) {
        newIncidentReport.photos = request.photos;
      }
      if (request.videos) {
        newIncidentReport.videos = request.videos;
      }
      const incidentReportOrError: Result<IncidentReport> =
        IncidentReport.create(
          newIncidentReport,
          new UniqueEntityID(request.incidentReportId.toString())
        );
      if (incidentReportOrError.isFailure) {
        return left(
          Result.fail<any>(incidentReportOrError.getErrorValue().toString())
        ) as UpdateIncidentReportResponse;
      } else {
        await this.incidentReportRepo.update(
          request.incidentReportId,
          incidentReportOrError.getValue()
        );
        return right(Result.ok<IncidentReport>(incidentReport));
      }
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
