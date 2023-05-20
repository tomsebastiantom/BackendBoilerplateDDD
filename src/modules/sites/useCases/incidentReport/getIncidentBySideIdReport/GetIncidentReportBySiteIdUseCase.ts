import { Either, Result, left, right } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { UseCase } from '../../../../../shared/core/UseCase';

import { GetIncidentReportBySiteIdDTO } from './GetIncidentReportBySiteIdDTO';
import { GetIncidentReportBySiteIdErrors } from './GetIncidentReportBySiteIdErrors';
import { GetIncidentReportBySiteIdResponse } from './GetIncidentReportBySiteIdResponse';
import { IIncidentReportRepo } from '../../../repos/incidentReportRepo';
import { IncidentReport } from '../../../domain/incidentReport';

export class GetIncidentReportBySiteIdUseCase
  implements
    UseCase<
      GetIncidentReportBySiteIdDTO,
      Promise<GetIncidentReportBySiteIdResponse>
    >
{
  private incidentReportRepo: IIncidentReportRepo;

  constructor(incidentReportRepo: IIncidentReportRepo) {
    this.incidentReportRepo = incidentReportRepo;
  }

  public async execute(
    request: GetIncidentReportBySiteIdDTO
  ): Promise<GetIncidentReportBySiteIdResponse> {
    try {
      const incidentReport: IncidentReport | IncidentReport[] =
        await this.incidentReportRepo.getBySiteId(request.siteId);
      if (!incidentReport) {
        return left(
          new GetIncidentReportBySiteIdErrors.IncidentIdForSiteIdNotValidError(
            request.siteId
          )
        ) as GetIncidentReportBySiteIdResponse;
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
