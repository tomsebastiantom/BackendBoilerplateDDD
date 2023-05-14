import { Either, Result, left, right } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { UseCase } from '../../../../../shared/core/UseCase';

import { ICheckpointRepo } from '../../../repos/checkpointRepo';
import { UpdateCheckpointDTO } from './UpdateCheckpointDTO';
import { UpdateCheckpointResponse } from './UpdateCheckpointResponse';
import { Checkpoint } from '../../../domain/checkpoint';
import { UniqueEntityID } from '../../../../../shared/domain/UniqueEntityID';

export class UpdateCheckpointUseCase
  implements UseCase<UpdateCheckpointDTO, Promise<UpdateCheckpointResponse>>
{
  private checkPointRepo: ICheckpointRepo;

  constructor(checkPointRepo: ICheckpointRepo) {
    this.checkPointRepo = checkPointRepo;
  }

  public async execute(
    request: UpdateCheckpointDTO
  ): Promise<UpdateCheckpointResponse> {
    try {
      let newcheckpoint: any = {
        siteId: request.siteId,
        checkpointName: request.checkpointName,
        description: request.description
      };
      if (request.latitude) {
        newcheckpoint.latitude = request.latitude;
      }
      if (request.longitude) {
        newcheckpoint.longitude = request.longitude;
      }
      if (request.isActive) {
        newcheckpoint.isActive = request.isActive;
      }
      const updatedCheckpoint: Checkpoint = Checkpoint.create(
        newcheckpoint,
        new UniqueEntityID(request.checkpointId.toString())
      ).getValue();
      await this.checkPointRepo.update(request.checkpointId, updatedCheckpoint);
      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
