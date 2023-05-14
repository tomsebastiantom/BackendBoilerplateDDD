import { Either, Result, left, right } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { UseCase } from '../../../../../shared/core/UseCase';

import { UpdateGuardReportDTO } from './UpdateGuardReportDTO';
import { UpdateGuardReportResponse } from './UpdateGuardReportResponse';
import { IGuardReportRepo } from '../../../repos/guardReportRepo';
import { GuardReport } from '../../../domain/guardReport';

import { UpdateGuardReportErrors } from './UpdateGuardReportErrors';

export class UpdateGuardReportUseCase
  implements UseCase<UpdateGuardReportDTO,Promise<UpdateGuardReportResponse>>
{
  private guardReportRepo: IGuardReportRepo;

  constructor(guardReportRepo: IGuardReportRepo) {
    this.guardReportRepo = guardReportRepo;
  }

  public async execute(
    request: UpdateGuardReportDTO
  ): Promise<UpdateGuardReportResponse> {
    try {
      const guardReport:GuardReport = await this.guardReportRepo.getByGuardReportId(
        request.guardReportId
      );
      if (!guardReport) {
        return left(
          new UpdateGuardReportErrors.ReportIdNotFoundError(request.guardReportId)
        ) as UpdateGuardReportResponse;
      }
      return right(Result.ok<GuardReport>(guardReport));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
