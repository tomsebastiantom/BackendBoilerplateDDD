
import { UseCaseError } from "../../../../../shared/core/UseCaseError"
import { Result } from "../../../../../shared/core/Result"

import { CheckpointId } from "../../../domain/checkpointId"

export namespace DeactivateCheckpointErrors {

  export class CheckpointIdNotFoundError extends Result<UseCaseError> {    
    constructor (checkpointId: CheckpointId) {
      super(false, {
        message:  `Checkpoint with ID ${checkpointId} not found`
      } as UseCaseError)
    }
  }




}