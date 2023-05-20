import { AppError } from '../../../../../shared/core/AppError';
import { Either, left, Result, right } from '../../../../../shared/core/Result';
import { UseCase } from '../../../../../shared/core/UseCase';
import { IScanRepo } from '../../../repos/scanRepo';
import { GetScanByIdDTO } from './GetScanByIdDTO';
import { GetScanByIdResponse } from './GetScanByIdResponse';
import { Scan } from '../../../domain/scan';

export class GetScanByIdUseCase
  implements UseCase<GetScanByIdDTO, Promise<GetScanByIdResponse>>
{
  private scanRepo: IScanRepo;

  constructor(scanRepo: IScanRepo) {
    this.scanRepo = scanRepo;
  }

  public async execute(request: GetScanByIdDTO): Promise<GetScanByIdResponse> {
    try {
      let scan: any;
      if (request.siteId) {
        scan = await this.scanRepo.getBySiteId(request.siteId);
      } else if (request.checkpointId) {
        scan = await this.scanRepo.getByCheckpointId(request.checkpointId);
      } else if (request.scanId) {
        scan = await this.scanRepo.getByScanId(request.scanId);
      } else if (request.userId) {
        scan = await this.scanRepo.getByUserId(request.userId);
      }
      if (Array.isArray(scan)) {
        return right(Result.ok<Scan[]>(scan));
      }
      return right(Result.ok<Scan>(scan));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
