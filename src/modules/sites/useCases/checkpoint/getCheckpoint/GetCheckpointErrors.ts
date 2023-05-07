
import { UseCaseError } from "../../../../../shared/core/UseCaseError"
import { Result } from "../../../../../shared/core/Result"

import { CheckpointId } from "../../../domain/checkpointId"

export namespace UpdateCheckpointErrors {

  export class CheckpointIdNotFoundError extends Result<UseCaseError> {    
    constructor (checkpointId: CheckpointId) {
      super(false, {
        message:  `Checkpoint with ID ${checkpointId} not found`
      } as UseCaseError)
    }
  }




}