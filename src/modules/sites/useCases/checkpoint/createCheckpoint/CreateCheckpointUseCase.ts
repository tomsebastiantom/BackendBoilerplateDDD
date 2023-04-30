import { Either, Result, left, right } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { UseCase } from '../../../../../shared/core/UseCase';

import { ICheckpointRepo } from '../../../repos/checkpointRepo';
import { CreateCheckpointDTO } from './CreateCheckpointDTO';
import { CreateCheckpointErrors } from './CreateCheckpointErrors';
import { CreateCheckpointResponse } from './CreateCheckpointResponse';
import { Checkpoint } from '../../../domain/checkpoint';
import { Entity } from '../../../../../shared/domain/Entity';

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
    //SiteId Not Validated
    const CreatedCheckpoint = Checkpoint.create({
      siteId: request.siteId,
      checkpointName: request.checkpointName,
      isActive: true,
      creationDate: new Date(),
      lastUpdateDate: new Date()
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
