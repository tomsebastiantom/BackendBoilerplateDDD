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
    const UpdatedCheckpoint = Checkpoint.create(
      {
        siteId: request.siteId,
        checkpointName: request.checkpointName,
        creationDate: request.creationDate,
        lastUpdatedDate: new Date()
      },
      new UniqueEntityID(request.checkpointId.toString())
    ).getValue();

    if (request.description) {
      UpdatedCheckpoint.description = request.description;
    }
   
    if (request.isActive) {
        UpdatedCheckpoint.isActive = request.isActive;
    }

    try {
      await this.checkPointRepo.save(UpdatedCheckpoint);
      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
