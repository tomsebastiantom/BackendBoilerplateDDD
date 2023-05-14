import { UseCaseError } from '../../../../../shared/core/UseCaseError';
import { Result } from '../../../../../shared/core/Result';



export namespace DeleteGuardReportErrors {
  export class GuardReportIdNotValidError extends Result<UseCaseError> {
    constructor(guardReportId: string) {
      super(false, {
        message: ` ${guardReportId} is not a valid `
      } as UseCaseError);
    }
  }
}
