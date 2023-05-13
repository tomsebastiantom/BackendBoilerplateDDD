import { Either, Result, left, right } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { UseCase } from '../../../../../shared/core/UseCase';

import { ICheckpointRepo } from '../../../repos/checkpointRepo';
import { CreateCheckpointDTO } from './CreateCheckpointDTO';
import { CreateCheckpointResponse } from './CreateCheckpointResponse';
import { Checkpoint } from '../../../domain/checkpoint';
import { UniqueEntityID } from '../../../../../shared/domain/UniqueEntityID';

export class CreateCheckpointUseCase
  implements UseCase<CreateCheckpointDTO, Promise<CreateCheckpointResponse>>
{
  private checkPointRepo: ICheckpointRepo;

  constructor(checkPointRepo: ICheckpointRepo) {
    this.checkPointRepo = checkPointRepo;
  }

  public async execute(
    request: CreateCheckpointDTO
  ): Promise<CreateCheckpointResponse> {
    //Todo SiteId Not Validated
    const CreatedCheckpoint = Checkpoint.create({
      siteId: request.siteId,
      checkpointName: request.checkpointName,
      isActive: true,
      creationTimestamp: request.creationTimestamp,
      lastUpdatedTimestamp:request.lastUpdatedTimestamp,
    }).getValue();

    if (request.description) {
      CreatedCheckpoint.description = request.description;
    }
    try {
      await this.checkPointRepo.save(CreatedCheckpoint);
      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
