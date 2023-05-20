import { Either, Result, left, right } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { UseCase } from '../../../../../shared/core/UseCase';

import { GetIncidentReportByUserIdDTO } from './GetIncidentReportByUserIdDTO';
import { GetIncidentReportByUserIdErrors } from './GetIncidentReportByUserIdErrors';
import { GetIncidentReportByUserIdResponse } from './GetIncidentReportByUserIdResponse';
import { IIncidentReportRepo } from '../../../repos/incidentReportRepo';
import { IncidentReport } from '../../../domain/incidentReport';

export class GetIncidentReportByUserIdUseCase
  implements
    UseCase<GetIncidentReportByUserIdDTO, Promise<GetIncidentReportByUserIdResponse>>
{
  private incidentReportRepo: IIncidentReportRepo;

  constructor(incidentReportRepo: IIncidentReportRepo) {
    this.incidentReportRepo = incidentReportRepo;
  }

  public async execute(
    request: GetIncidentReportByUserIdDTO
  ): Promise<GetIncidentReportByUserIdResponse> {
    try {
      const incidentReport: IncidentReport | IncidentReport[] =
        await this.incidentReportRepo.getBySiteId(request.userId);
      if (!incidentReport) {
        return left(
          new GetIncidentReportByUserIdErrors.UserIdNotValidError(
            request.userId
          )
        ) as GetIncidentReportByUserIdResponse;
      }

      if (Array.isArray(incidentReport)) {
        return right(Result.ok<IncidentReport[]>(incidentReport));
      } else {
        return right(Result.ok<IncidentReport>(incidentReport));
      }
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
