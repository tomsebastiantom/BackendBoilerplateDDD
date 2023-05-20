import { Either, Result, left, right } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { UseCase } from '../../../../../shared/core/UseCase';

import { IIncidentReportRepo } from '../../../repos/incidentReportRepo';
import { CreateIncidentReportDTO } from './CreateIncidentReportDTO';
import { CreateIncidentReportErrors } from './CreateIncidentReportErrors';
import { CreateIncidentReportResponse } from './CreateIncidentReportResponse';
import { IncidentReport } from '../../../domain/incidentReport';

export class CreateIncidentReportUseCase
  implements
    UseCase<CreateIncidentReportDTO, Promise<CreateIncidentReportResponse>>
{
  private incidentReportRepo: IIncidentReportRepo;

  constructor(incidentReportRepo: IIncidentReportRepo) {
    this.incidentReportRepo = incidentReportRepo;
  }

  public async execute(
    request: CreateIncidentReportDTO
  ): Promise<CreateIncidentReportResponse> {
    try {
      let newIncidentReport: any = {
        userId: request.userId,
        siteId: request.siteId,
        timeOfIncident: request.timeOfIncident,
        incidentDescription: request.incidentDescription,
        incidentType: request.incidentType
      };

      if (request.photos) {
        newIncidentReport.photos = request.photos;
      }
      if (request.videos) {
        newIncidentReport.videos = request.videos;
      }
      const guardReportOrError: Result<IncidentReport> =
        IncidentReport.create(newIncidentReport);
      if (guardReportOrError.isFailure) {
        return left(
          Result.fail<any>(guardReportOrError.getErrorValue().toString())
        ) as CreateIncidentReportResponse;
      } else {
        const incidentReport: IncidentReport = guardReportOrError.getValue();

        await this.incidentReportRepo.save(incidentReport);
        return right(Result.ok<IncidentReport>(incidentReport));
      }
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
