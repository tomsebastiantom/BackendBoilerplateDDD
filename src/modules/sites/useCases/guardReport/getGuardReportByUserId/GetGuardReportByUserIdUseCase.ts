import { AppError } from '../../../../../shared/core/AppError';
import { Either, left, Result, right } from '../../../../../shared/core/Result';
import { UseCase } from '../../../../../shared/core/UseCase';
import { GuardReport } from '../../../domain/guardReport';
import { IGuardReportRepo } from '../../../repos/guardReportRepo';
import { GetGuardReportByUserIdDTO } from './GetGuardReportByUserIdDTO';
import { GetGuardReportByUserIdErrors } from './GetGuardReportByUserIdErrors';
import { GetGuardReportByUserIdResponse } from './GetGuardReportByUserIdResponse';

export class GetGuardReportByUserIdUseCase
  implements
    UseCase<GetGuardReportByUserIdDTO, Promise<GetGuardReportByUserIdResponse>>
{
  private guardReportRepo: IGuardReportRepo;

  constructor(guardReportRepo: IGuardReportRepo) {
    this.guardReportRepo = guardReportRepo;
  }

  public async execute(
    request: GetGuardReportByUserIdDTO
  ): Promise<GetGuardReportByUserIdResponse> {
    try {
      const guardReport: GuardReport|GuardReport[] =
        await this.guardReportRepo.getByUserId(request.userId);
      if (!guardReport) {
        return left(
          new GetGuardReportByUserIdErrors.ReportForUserIdNotFoundError(
            request.userId
          )
        ) as GetGuardReportByUserIdResponse;
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
