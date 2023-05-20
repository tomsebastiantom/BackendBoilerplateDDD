import { Either, Result, left, right } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { UseCase } from '../../../../../shared/core/UseCase';

import { ICheckpointRepo } from '../../../repos/checkpointRepo';
import { CreateCheckpointDTO } from './CreateCheckpointDTO';
import { CreateCheckpointResponse } from './CreateCheckpointResponse';
import { Checkpoint } from '../../../domain/checkpoint';


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
    try {
      let newcheckpoint: any = {
        siteId: request.siteId,
        checkpointName: request.checkpointName,
        isActive: true,
        identifier: request.identifier
      };
      if (request.description) {
        newcheckpoint.description = request.description;
      }

      const checkpointOrError: Result<Checkpoint> =
        Checkpoint.create(newcheckpoint);
      if (checkpointOrError.isFailure) {
        return left(
          Result.fail<any>(checkpointOrError.getErrorValue().toString())
        ) as CreateCheckpointResponse;
      } else {
        await this.checkPointRepo.save(checkpointOrError.getValue());
        return right(Result.ok<void>());
      }
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
