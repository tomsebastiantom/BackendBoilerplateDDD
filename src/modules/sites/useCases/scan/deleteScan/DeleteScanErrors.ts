import { Result } from '../../../../../shared/core/Result';
import { UseCaseError } from '../../../../../shared/core/UseCaseError';
import { SiteId } from '../../../domain/siteId';

export namespace DeleteSiteErrors {
  export class SiteIdNotFoundError extends Result<UseCaseError> {
    constructor(siteId: SiteId) {
      super(false, {
        message: `Site with ID ${siteId} not found`
      } as UseCaseError);
    }
  }
}
