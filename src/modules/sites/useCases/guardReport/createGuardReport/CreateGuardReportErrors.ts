import { UseCaseError } from '../../../../../shared/core/UseCaseError';
import { Result } from '../../../../../shared/core/Result';

import { SiteId } from '../../../domain/siteId';

export namespace CreateGuardReportErrors {
  export class SiteIdNotValidError extends Result<UseCaseError> {
    constructor(siteId:SiteId) {
      super(false, {
        message: ` ${siteId} is not a valid `
      } as UseCaseError);
    }
  }
}
