import { Either, Result, left, right } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { UseCase } from '../../../../../shared/core/UseCase';

import { ICheckpointRepo } from '../../../repos/checkpointRepo';
import { DeactivateCheckpointDTO } from './DeactivateCheckpointDTO';
import { DeactivateCheckpointResponse } from './DeactivateCheckpointResponse';
import { DeactivateCheckpointErrors } from './DeactivateCheckpointErrors';
import { Checkpoint } from '../../../domain/checkpoint';


export class DeactivateCheckpointUseCase
  implements
    UseCase<DeactivateCheckpointDTO, Promise<DeactivateCheckpointResponse>>
{
  private checkPointRepo: ICheckpointRepo;

  constructor(checkPointRepo: ICheckpointRepo) {
    this.checkPointRepo = checkPointRepo;
  }

  public async execute(
    request: DeactivateCheckpointDTO
  ): Promise<DeactivateCheckpointResponse> {
    try {
      const checkpoint = await this.checkPointRepo.getByCheckpointId(
        request.checkpointId
      );
      const checkpointFound = !!checkpoint === true;
      if (!checkpointFound) {
        return left(
          new DeactivateCheckpointErrors.CheckpointIdNotFoundError(
            request.checkpointId
          )
        );
      }
      const deactivatedCheckpoint = checkpoint as Checkpoint;

      deactivatedCheckpoint.isActive = false;
   

      await this.checkPointRepo.save(deactivatedCheckpoint);
      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
