import { Result } from '../../../../../shared/core/Result';
import { UseCaseError } from '../../../../../shared/core/UseCaseError';

export namespace GetGuardReportBySiteIdErrors {
  export class ReportForSiteIdNotFoundError extends Result<UseCaseError> {
    constructor(siteId: string) {
      super(false, {
        message: `Guard Report for Site with Id ${siteId} not found`
      } as UseCaseError);
    }
  }
}
