import { Either, Result, left, right } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { UseCase } from '../../../../../shared/core/UseCase';

import { ICheckpointRepo } from '../../../repos/checkpointRepo';
import { GetCheckpointDTO } from './GetCheckpointDTO';
import { GetCheckpointResponse } from './GetCheckpointResponse';
import { Checkpoint } from '../../../domain/checkpoint';
import { UniqueEntityID } from '../../../../../shared/domain/UniqueEntityID';

export class GetCheckpointUseCase
  implements UseCase<GetCheckpointDTO, Promise<GetCheckpointResponse>>
{
  private checkPointRepo: ICheckpointRepo;

  constructor(checkPointRepo: ICheckpointRepo) {
    this.checkPointRepo = checkPointRepo;
  }

  public async execute(
    request: GetCheckpointDTO
  ): Promise<GetCheckpointResponse> {
   

    try {
      await this.checkPointRepo.getByCheckpointId(request.checkpointId)
      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
