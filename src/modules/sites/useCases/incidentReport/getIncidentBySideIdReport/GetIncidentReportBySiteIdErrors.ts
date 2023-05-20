import { UseCaseError } from '../../../../../shared/core/UseCaseError';
import { Result } from '../../../../../shared/core/Result';

export namespace GetIncidentReportBySiteIdErrors {
  export class IncidentIdForSiteIdNotValidError extends Result<UseCaseError> {
    constructor(siteId: string) {
      super(false, {
        message: ` ${siteId} is not a valid address`
      } as UseCaseError);
    }
  }
}
