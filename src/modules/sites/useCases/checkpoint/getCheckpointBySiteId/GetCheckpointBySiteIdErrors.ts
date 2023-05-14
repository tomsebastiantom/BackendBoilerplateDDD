
import { UseCaseError } from "../../../../../shared/core/UseCaseError"
import { Result } from "../../../../../shared/core/Result"

import { CheckpointId } from "../../../domain/checkpointId"

export namespace GetCheckpointBySiteIdErrors {

  export class CheckpointForSiteIdNotFoundError extends Result<UseCaseError> {    
    constructor (checkpointId: string) {
      super(false, {
        message:  `Checkpoint for Site with ID ${checkpointId} not found`
      } as UseCaseError)
    }
  }




}