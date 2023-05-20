import { Result } from '../../../../../shared/core/Result';
import { UseCaseError } from '../../../../../shared/core/UseCaseError';


export namespace CreateScanErrors {
  export class SiteIdNotValidError extends Result<UseCaseError> {
    constructor(siteId: string) {
      super(false, {
        message: `Site Id ${siteId} is not valid `
      } as UseCaseError);
    }
  }
  export class UserIdNotValidError extends Result<UseCaseError> {
    constructor(userId: string) {
      super(false, {
        message: `Site Id ${userId} is not valid `
      } as UseCaseError);
    }
  }
  export class CheckpointIdNotValidError extends Result<UseCaseError> {
    constructor(checkpointId: string) {
      super(false, {
        message: `Checkpoint Id ${checkpointId} is not valid `
      } as UseCaseError);
    }
  }
  export class ScanIdNotValidError extends Result<UseCaseError> {
    constructor(scanId: string) {
      super(false, {
        message: `Scan Id ${scanId} is not valid `
      } as UseCaseError);
    }
  }
}
