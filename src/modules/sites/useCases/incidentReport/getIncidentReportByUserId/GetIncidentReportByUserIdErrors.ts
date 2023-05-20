import { UseCaseError } from '../../../../../shared/core/UseCaseError';
import { Result } from '../../../../../shared/core/Result';

export namespace GetIncidentReportByUserIdErrors {
  export class UserIdNotValidError extends Result<UseCaseError> {
    constructor(userId: string) {
      super(false, {
        message: ` ${userId} is not a valid `
      } as UseCaseError);
    }
  }
}
