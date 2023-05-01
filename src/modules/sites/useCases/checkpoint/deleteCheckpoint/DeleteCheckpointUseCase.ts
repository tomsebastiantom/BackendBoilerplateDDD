import { Either, Result, left, right } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { UseCase } from '../../../../../shared/core/UseCase';

import { ICheckpointRepo } from '../../../repos/checkpointRepo';
import { DeleteCheckpointDTO } from './DeleteCheckpointDTO';
import { DeleteCheckpointErrors } from './DeleteCheckpointErrors';
import { DeleteCheckpointResponse } from './DeleteCheckpointResponse';



export class DeleteCheckpointUseCase
  implements UseCase<DeleteCheckpointDTO, Promise<DeleteCheckpointResponse>>
{
  private checkPointRepo: ICheckpointRepo;

  constructor(checkPointRepo: ICheckpointRepo) {
    this.checkPointRepo = checkPointRepo;
  }

  public async execute(
    request: DeleteCheckpointDTO
  ): Promise<DeleteCheckpointResponse> {
   
    try {
     const checkpoint =  await this.checkPointRepo.getByCheckpointId(request.checkpointId);
        const checkpointFound = !!checkpoint === true;
        if (!checkpointFound) {
            return left(
                new DeleteCheckpointErrors.CheckpointIdNotFoundError(
                request.checkpointId
                )
            );
        }
        //Todo scan deletion when site deleted
        await this.checkPointRepo.delete(request.checkpointId);
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
