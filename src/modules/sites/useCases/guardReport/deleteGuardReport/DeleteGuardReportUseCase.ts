import { Either, Result, left, right } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { UseCase } from '../../../../../shared/core/UseCase';

import { DeleteGuardReportDTO } from './DeleteGuardReportDTO';
import { DeleteGuardReportResponse } from './DeleteGuardReportResponse';
import { DeleteGuardReportErrors } from './DeleteGuardReportErrors';
import { IGuardReportRepo } from '../../../repos/guardReportRepo';
import { GuardReport } from '../../../domain/guardReport';
import { ReportId } from '../../../domain/ReportId';
export class DeleteGuardReportUseCase
  implements UseCase<DeleteGuardReportDTO, Promise<DeleteGuardReportResponse>>
{
  private guardReportRepo: IGuardReportRepo;

  constructor(guardReportRepo: IGuardReportRepo) {
    this.guardReportRepo = guardReportRepo;
  }

  public async execute(
    request: DeleteGuardReportDTO
  ): Promise<DeleteGuardReportResponse> {
    try {
      const guardReport: GuardReport =
        await this.guardReportRepo.getByGuardReportId(request.ReportId);

      const guardReportFound = !!guardReport === true;
      if (!guardReportFound) {
        return left(
          new DeleteGuardReportErrors.GuardReportIdNotValidError(request.ReportId)
        );
      }

      await this.guardReportRepo.delete(request.ReportId);

      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
