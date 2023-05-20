import { Either, Result, left, right } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { UseCase } from '../../../../../shared/core/UseCase';

import { DeleteIncidentReportDTO } from './DeleteIncidentReportDTO';
import { DeleteIncidentReportResponse } from './DeleteIncidentReportResponse';
import { IIncidentReportRepo } from '../../../repos/incidentReportRepo';


export class DeleteIncidentReportUseCase
  implements
    UseCase<DeleteIncidentReportDTO, Promise<DeleteIncidentReportResponse>>
{
  private incidentReportRepo: IIncidentReportRepo;

  constructor(incidentReportRepo: IIncidentReportRepo) {
    this.incidentReportRepo = incidentReportRepo;
  }

  public async execute(
    request: DeleteIncidentReportDTO
  ): Promise<DeleteIncidentReportResponse> {
    try {
      await this.incidentReportRepo.delete(request.incidentId);
      return right(Result.ok<any>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
