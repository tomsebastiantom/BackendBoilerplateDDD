import { Either, Result, left, right } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { UseCase } from '../../../../../shared/core/UseCase';

import { UpdateGuardReportDTO } from './UpdateGuardReportDTO';
import { UpdateGuardReportResponse } from './UpdateGuardReportResponse';
import { IGuardReportRepo } from '../../../repos/guardReportRepo';
import { GuardReport } from '../../../domain/guardReport';
import { UniqueEntityID } from '../../../../../shared/domain/UniqueEntityID';
import { UpdateGuardReportErrors } from './UpdateGuardReportErrors';

export class UpdateGuardReportUseCase
  implements UseCase<UpdateGuardReportDTO, Promise<UpdateGuardReportResponse>>
{
  private guardReportRepo: IGuardReportRepo;

  constructor(guardReportRepo: IGuardReportRepo) {
    this.guardReportRepo = guardReportRepo;
  }

  public async execute(
    request: UpdateGuardReportDTO
  ): Promise<UpdateGuardReportResponse> {
    try {
      const guardReport: GuardReport =
        await this.guardReportRepo.getByGuardReportId(request.guardReportId);
      if (!guardReport) {
        return left(
          new UpdateGuardReportErrors.ReportIdNotFoundError(
            request.guardReportId
          )
        ) as UpdateGuardReportResponse;
      }
      let newGuardReport: any = {
        ...guardReport
      };

      if (request.userId) {
        newGuardReport.userId = request.userId;
      }
      if (request.siteId) {
        newGuardReport.siteId = request.siteId;
      }
      if (request.endTimestamp) {
        newGuardReport.endTimestamp = request.endTimestamp;
      }
      if (request.startTimestamp) {
        newGuardReport.startTimestamp = request.startTimestamp;
      }
      if (request.sendTimestamp) {
        newGuardReport.sendTimestamp = request.sendTimestamp;
      }
      if (request.recipient) {
        newGuardReport.recipient = request.recipient;
      }

      const guardReportOrError: Result<GuardReport> = GuardReport.create(
        newGuardReport,
        new UniqueEntityID(request.guardReportId.toString())
      );
      if (guardReportOrError.isFailure) {
        return left(
          Result.fail<any>(guardReportOrError.getErrorValue().toString())
        ) as UpdateGuardReportResponse;
      }

      await this.guardReportRepo.update(
        request.guardReportId,
        guardReportOrError.getValue()
      );

      return right(Result.ok<GuardReport>(guardReportOrError.getValue()));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
