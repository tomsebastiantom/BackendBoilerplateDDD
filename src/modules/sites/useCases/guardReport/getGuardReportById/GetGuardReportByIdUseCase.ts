import { AppError } from '../../../../../shared/core/AppError';
import { Either, left, Result, right } from '../../../../../shared/core/Result';
import { UseCase } from '../../../../../shared/core/UseCase';
import { GuardReport } from '../../../domain/guardReport';
import { IGuardReportRepo } from '../../../repos/guardReportRepo';
import { GetGuardReportByIdDTO } from './GetGuardReportByIdDTO';
import { GetGuardReportByIdErrors } from './GetGuardReportByIdErrors';
import { GetGuardReportByIdResponse } from './GetGuardReportByIdResponse';

export class GetGuardReportByIdUseCase
  implements UseCase<GetGuardReportByIdDTO, Promise<GetGuardReportByIdResponse>>
{
  private guardReportRepo: IGuardReportRepo;

  constructor(guardReportRepo: IGuardReportRepo) {
    this.guardReportRepo = guardReportRepo;
  }

  public async execute(
    request: GetGuardReportByIdDTO
  ): Promise<GetGuardReportByIdResponse> {
    try {
      const guardReport: GuardReport =
        await this.guardReportRepo.getByGuardReportId(request.guardReportId);
      if (!guardReport) {
        return left(
          new GetGuardReportByIdErrors.ReportIdNotFoundError(request.guardReportId)
        ) as GetGuardReportByIdResponse;
      }
      return right(Result.ok<GuardReport>(guardReport));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
