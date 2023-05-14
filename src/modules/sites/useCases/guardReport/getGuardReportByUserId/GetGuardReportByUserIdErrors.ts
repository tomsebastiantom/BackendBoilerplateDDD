import { Result } from '../../../../../shared/core/Result';
import { UseCaseError } from '../../../../../shared/core/UseCaseError';

export namespace GetGuardReportByUserIdErrors {
  export class ReportForUserIdNotFoundError extends Result<UseCaseError> {
    constructor(userId: string) {
      super(false, {
        message: `Guard Report for user ID ${userId} not found`
      } as UseCaseError);
    }
  }
}
