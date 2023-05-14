import { Either, Result, left, right } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { UseCase } from '../../../../../shared/core/UseCase';

import { CreateGuardReportDTO } from './CreateGuardReportDTO';
import { CreateGuardReportErrors } from './CreateGuardReportErrors';
import { CreateGuardReportResponse } from './CreateGuardReportResponse';
import { IGuardReportRepo } from '../../../repos/guardReportRepo';
import { GuardReport } from '../../../domain/guardReport';

export class CreateGuardReportUseCase
  implements UseCase<CreateGuardReportDTO, Promise<CreateGuardReportResponse>>
{
  private GuardReportRepo: IGuardReportRepo;

  constructor(GuardReportRepo: IGuardReportRepo) {
    this.GuardReportRepo = GuardReportRepo;
  }

  public async execute(
    request: CreateGuardReportDTO
  ): Promise<CreateGuardReportResponse> {
    try {
      let createdGuardReport: any = {
        userId: request.userId,
        startTimestamp: request.startTimestamp,
        endTimestamp: request.endTimestamp
      };

      if (request.siteId) {
        createdGuardReport.siteId = request.siteId;
      }
      if (request.recipient) {
        createdGuardReport.recipient = request.recipient;
      }
      const guardReportOrError: Result<GuardReport> =
        GuardReport.create(createdGuardReport);
      if (guardReportOrError.isFailure) {
        return left(
          Result.fail<any>(guardReportOrError.getErrorValue().toString())
        ) as CreateGuardReportResponse;
      } else {
        const guardReport: GuardReport = guardReportOrError.getValue();

        await this.GuardReportRepo.save(guardReport);
        return right(Result.ok<void>());
      }
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
