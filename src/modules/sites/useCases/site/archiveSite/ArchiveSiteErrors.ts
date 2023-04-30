
import { UseCaseError } from "../../../../../shared/core/UseCaseError"
import { Result } from "../../../../../shared/core/Result"

import { Checkpoint } from "../../../domain/checkpoint"
export namespace ActivateCheckpointErrors {

  export class CheckpointNotFoundError extends Result<UseCaseError> {    
    constructor (checkpoint: Checkpoint) {
      super(false, {
        message:  `Checkpoint not found`
      } as UseCaseError)
    }
  }




}