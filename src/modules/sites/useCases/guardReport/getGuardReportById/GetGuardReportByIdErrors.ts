import { Result } from '../../../../../shared/core/Result';
import { UseCaseError } from '../../../../../shared/core/UseCaseError';

export namespace GetGuardReportByIdErrors {
  export class ReportIdNotFoundError extends Result<UseCaseError> {
    constructor(reportId: string) {
      super(false, {
        message: `Guard Report with ID ${reportId} not found`
      } as UseCaseError);
    }
  }
}
