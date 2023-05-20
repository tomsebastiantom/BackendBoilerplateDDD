import { Either, Result, left, right } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { UseCase } from '../../../../../shared/core/UseCase';

import { ICheckpointRepo } from '../../../repos/checkpointRepo';
import { UpdateCheckpointDTO } from './UpdateCheckpointDTO';
import { UpdateCheckpointResponse } from './UpdateCheckpointResponse';
import { Checkpoint } from '../../../domain/checkpoint';
import { UniqueEntityID } from '../../../../../shared/domain/UniqueEntityID';
import { UpdateCheckpointErrors } from './UpdateCheckpointErrors';

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
      const checkpoint: Checkpoint =
        await this.checkPointRepo.getByCheckpointId(request.checkpointId);
      if (!checkpoint) {
        return left(
          new UpdateCheckpointErrors.CheckpointIdNotFoundError(
            request.checkpointId
          )
        ) as UpdateCheckpointResponse;
      }
      let newcheckpoint: any = {};

      if (request.checkpointName) {
        newcheckpoint.checkpointName = request.checkpointName;
      }
      if (request.siteId) {
        newcheckpoint.siteId = request.siteId;
      }
      if (request.description) {
        newcheckpoint.description = request.description;
      }
      if (request.latitude) {
        newcheckpoint.latitude = request.latitude;
      }
      if (request.longitude) {
        newcheckpoint.longitude = request.longitude;
      }
      if (request.isActive) {
        newcheckpoint.isActive = request.isActive;
      }
      const updatedCheckpointOrError: Result<Checkpoint> = Checkpoint.create(
        newcheckpoint,
        new UniqueEntityID(request.checkpointId.toString())
      );
      if (updatedCheckpointOrError.isFailure) {
        return left(
          Result.fail<any>(updatedCheckpointOrError.getErrorValue().toString())
        ) as UpdateCheckpointResponse;
      }

      await this.checkPointRepo.update(
        request.checkpointId,
        updatedCheckpointOrError.getValue()
      );
      return right(Result.ok<Checkpoint>(updatedCheckpointOrError.getValue()));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
