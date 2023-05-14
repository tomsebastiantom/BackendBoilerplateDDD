import { UseCaseError } from '../../../../../shared/core/UseCaseError';
import { Result } from '../../../../../shared/core/Result';

export namespace UpdateGuardReportErrors {
  export class ReportIdNotFoundError extends Result<UseCaseError> {
    constructor(reportId: string) {
      super(false, {
        message: `Guard Report with ID ${reportId} not found`
      } as UseCaseError);
    }
  }
}
