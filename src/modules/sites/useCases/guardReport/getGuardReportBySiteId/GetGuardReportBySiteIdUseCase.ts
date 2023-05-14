import { AppError } from '../../../../../shared/core/AppError';
import { Either, left, Result, right } from '../../../../../shared/core/Result';
import { UseCase } from '../../../../../shared/core/UseCase';
import { GuardReport } from '../../../domain/guardReport';
import { IGuardReportRepo } from '../../../repos/guardReportRepo';
import { GetGuardReportBySiteIdDTO } from './GetGuardReportBySiteIdDTO';
import { GetGuardReportBySiteIdErrors } from './GetGuardReportBySiteIdErrors';
import { GetGuardReportBySiteIdResponse } from './GetGuardReportBySiteIdResponse';

export class GetGuardReportBySiteIdUseCase
  implements UseCase<GetGuardReportBySiteIdDTO, Promise<GetGuardReportBySiteIdResponse>>
{
  private guardReportRepo: IGuardReportRepo;

  constructor(guardReportRepo: IGuardReportRepo) {
    this.guardReportRepo = guardReportRepo;
  }

  public async execute(
    request: GetGuardReportBySiteIdDTO
  ): Promise<GetGuardReportBySiteIdResponse> {
    try {
      const guardReport: GuardReport|GuardReport[] =
        await this.guardReportRepo.getBySiteId(request.siteId);
      if (!guardReport) {
        return left(
          new GetGuardReportBySiteIdErrors.ReportForSiteIdNotFoundError(request.siteId)
        ) as GetGuardReportBySiteIdResponse;
      }
    
      if (Array.isArray(guardReport)) {
        return right(Result.ok<GuardReport[]>(guardReport));
      } 


      return right(Result.ok<GuardReport>(guardReport));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
