import { Either, Result, left, right } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { UseCase } from '../../../../../shared/core/UseCase';

import { ICheckpointRepo } from '../../../repos/checkpointRepo';
import { ActivateCheckpointErrors } from './ActivateCheckpointErrors';
import { ActivateCheckpointDTO } from './ActivateCheckpointDTO';
import { ActivateCheckpointResponse } from './ActivateCheckpointResponse';
import { Checkpoint } from '../../../domain/checkpoint';


export class ActivateCheckpointUseCase
  implements
    UseCase<ActivateCheckpointDTO, Promise<ActivateCheckpointResponse>>
{
  private checkPointRepo: ICheckpointRepo;

  constructor(checkPointRepo: ICheckpointRepo) {
    this.checkPointRepo = checkPointRepo;
  }

  public async execute(
    request: ActivateCheckpointDTO
  ): Promise<ActivateCheckpointResponse> {
    try {
      const checkpoint = await this.checkPointRepo.getByCheckpointId(
        request.checkpointId
      );
      const checkpointFound = !!checkpoint === true;
      if (!checkpointFound) {
        return left(
          new ActivateCheckpointErrors.CheckpointIdNotFoundError(
            request.checkpointId
          )
        );
      }
      const activatedCheckpoint = checkpoint as Checkpoint;

      activatedCheckpoint.isActive = true;
      activatedCheckpoint.lastUpdateDate = new Date();

      await this.checkPointRepo.save(activatedCheckpoint);
      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
