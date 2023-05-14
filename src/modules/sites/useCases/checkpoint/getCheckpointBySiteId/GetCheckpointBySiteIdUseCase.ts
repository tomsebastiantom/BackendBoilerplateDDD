import { Either, Result, left, right } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { UseCase } from '../../../../../shared/core/UseCase';

import { ICheckpointRepo } from '../../../repos/checkpointRepo';
import { GetCheckpointBySiteIdDTO } from './GetCheckpointBySiteIdDTO';
import { GetCheckpointBySiteIdResponse } from './GetCheckpointBySiteIdResponse';
import { Checkpoint } from '../../../domain/checkpoint';
import { UniqueEntityID } from '../../../../../shared/domain/UniqueEntityID';

export class GetCheckpointBySiteIdUseCase
  implements
    UseCase<GetCheckpointBySiteIdDTO, Promise<GetCheckpointBySiteIdResponse>>
{
  private checkPointRepo: ICheckpointRepo;

  constructor(checkPointRepo: ICheckpointRepo) {
    this.checkPointRepo = checkPointRepo;
  }

  public async execute(
    request: GetCheckpointBySiteIdDTO
  ): Promise<GetCheckpointBySiteIdResponse> {
    try {
      const checkpoints = await this.checkPointRepo.getBySiteId(request.siteId);

      if (Array.isArray(checkpoints)) {
        return right(Result.ok<Checkpoint[]>(checkpoints));
      }
      return right(Result.ok<Checkpoint>(checkpoints));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
