
import { UseCaseError } from "../../../../../shared/core/UseCaseError"
import { Result } from "../../../../../shared/core/Result"


export namespace UpdateCheckpointErrors {

  export class CheckpointIdNotFoundError extends Result<UseCaseError> {    
    constructor (checkpointId: string) {
      super(false, {
        message:  `Checkpoint with ID ${checkpointId} not found`
      } as UseCaseError)
    }
  }




}