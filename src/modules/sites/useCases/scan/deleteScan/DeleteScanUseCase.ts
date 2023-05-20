import { AppError } from '../../../../../shared/core/AppError';
import { Either, left, Result, right } from '../../../../../shared/core/Result';
import { UseCase } from '../../../../../shared/core/UseCase';
import { IScanRepo } from '../../../repos/scanRepo';
import { DeleteScanDTO } from './DeleteScanDTO';
import { DeleteScanResponse } from './DeleteScanResponse';

export class DeleteScanUseCase
  implements UseCase<DeleteScanDTO, Promise<DeleteScanResponse>>
{
  private scanRepo: IScanRepo;

  constructor(scanRepo: IScanRepo) {
    this.scanRepo = scanRepo;
  }

  public async execute(request: DeleteScanDTO): Promise<DeleteScanResponse> {
    try {
      if (request.siteId) {
        await this.scanRepo.deleteBySiteId(request.siteId);
        return right(Result.ok<void>());
      }
      if (request.checkpointId) {
        await this.scanRepo.deleteByCheckpointId(request.checkpointId);
        return right(Result.ok<void>());
      }
      if (request.scanId) {
        await this.scanRepo.deleteById(request.scanId);

        return right(Result.ok<void>());
      }
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
