import { Either, Result, left, right } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { UseCase } from '../../../../../shared/core/UseCase';

import { GetIncidentReportByIdDTO } from './GetIncidentReportByUserIdDTO';
import { GetIncidentReportByIdErrors } from './GetIncidentReportByUserIdErrors';
import { GetIncidentReportByIdResponse } from './GetIncidentReportByUserIdResponse';
import { IIncidentReportRepo } from '../../../repos/incidentReportRepo';
import { IncidentReport } from '../../../domain/incidentReport';

export class GetIncidentReportByIdUseCase
  implements
    UseCase<GetIncidentReportByIdDTO, Promise<GetIncidentReportByIdResponse>>
{
  private incidentReportRepo: IIncidentReportRepo;

  constructor(incidentReportRepo: IIncidentReportRepo) {
    this.incidentReportRepo = incidentReportRepo;
  }

  public async execute(
    request: GetIncidentReportByIdDTO
  ): Promise<GetIncidentReportByIdResponse> {
    try {
      const incidentReport: IncidentReport =
        await this.incidentReportRepo.getByIncidentReportId(request.incidentId);
      if (!incidentReport) {
        return left(
          new GetIncidentReportByIdErrors.IncidentIdNotValidError(
            request.incidentId
          )
        ) as GetIncidentReportByIdResponse;
      }
      return right(Result.ok<IncidentReport>(incidentReport));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
