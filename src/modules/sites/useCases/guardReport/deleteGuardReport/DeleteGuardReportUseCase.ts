import { Either, Result, left, right } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { UseCase } from '../../../../../shared/core/UseCase';

import { DeleteGuardReportDTO } from './DeleteGuardReportDTO';
import { DeleteGuardReportResponse } from './DeleteGuardReportResponse';
import { DeleteGuardReportErrors } from './DeleteGuardReportErrors';
import { IGuardReportRepo } from '../../../repos/guardReportRepo';
import { GuardReport } from '../../../domain/guardReport';

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
      if (!request.reportId) {
        const guardReport: GuardReport =
          await this.guardReportRepo.getByGuardReportId(
            request.reportId as string
          );

        const guardReportFound = !!guardReport === true;
        if (!guardReportFound) {
          return left(
            new DeleteGuardReportErrors.GuardReportIdNotValidError(
              request.reportId as string
            )
          );
        }

        await this.guardReportRepo.delete(request.reportId as string);
      } else if (request.siteId) {
        await this.guardReportRepo.deleteBySiteId(request.siteId);
      }

      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
