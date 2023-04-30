import { UseCaseError } from '../../../../../shared/core/UseCaseError';
import { Result } from '../../../../../shared/core/Result';

import { SiteId } from '../../../domain/siteId';

export namespace CreateCheckpointErrors {
  export class SiteIdNotFoundError extends Result<UseCaseError> {
    constructor(siteId: SiteId) {
      super(false, {
        message: `Site with ID ${siteId} not found`
      } as UseCaseError);
    }
  }
}
