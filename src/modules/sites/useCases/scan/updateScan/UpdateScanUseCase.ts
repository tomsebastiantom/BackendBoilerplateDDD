import { AppError } from '../../../../../shared/core/AppError';
import { Either, left, Result, right } from '../../../../../shared/core/Result';
import { UseCase } from '../../../../../shared/core/UseCase';
import { UniqueEntityID } from '../../../../../shared/domain/UniqueEntityID';
import { Scan } from '../../../domain/scan';
import { ICheckpointRepo } from '../../../repos/checkpointRepo';
import { IScanRepo } from '../../../repos/scanRepo';
import { UpdateScanDTO } from './UpdateScanDTO';
import { UpdateScanErrors } from './UpdateScanErrors';
import { UpdateScanResponse } from './UpdateScanResponse';

export class UpdateScanUseCase
  implements UseCase<UpdateScanDTO, Promise<UpdateScanResponse>>
{
  private scanRepo: IScanRepo;
  private checkpointRepo: ICheckpointRepo;

  constructor(scanRepo: IScanRepo, checkpointRepo: ICheckpointRepo) {
    this.scanRepo = scanRepo;
    this.checkpointRepo = checkpointRepo;
  }

  public async execute(request: UpdateScanDTO): Promise<UpdateScanResponse> {
    try {
      const scan: Scan = await this.scanRepo.getByScanId(request.scanId);
      if (!scan) {
        return left(
          new UpdateScanErrors.ScanIdNotValidError(request.scanId)
        ) as UpdateScanResponse;
      }
      let newScan: any = {
        ...scan
      };

      if (request.userId) {
        newScan.userId = request.userId;
      }
      if (request.identifier) {
        newScan.identifier = request.identifier;
      }
      if (request.timestamp) {
        newScan.timestamp = request.timestamp;
      }
      if (request.location) {
        newScan.location = request.location;
      }

      if (request.comment) {
        newScan.comment = request.comment;
      }
      if (request.assets) {
        newScan.assets = request.assets;
      }
      if (request.checkpointId) {
        newScan.checkpointId = request.checkpointId;
      }
      if (request.siteId) {
        newScan.siteId = request.siteId;
      }

      const scanOrError = Scan.create(
        newScan,
        new UniqueEntityID(request.scanId.toString())
      );
      if (scanOrError.isFailure) {
        return left(
          Result.fail<any>(scanOrError.getErrorValue().toString())
        ) as UpdateScanResponse;
      }
      await this.scanRepo.update(request.scanId, scanOrError.getValue() as Scan);

      return right(Result.ok<Scan>(scanOrError.getValue()));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
