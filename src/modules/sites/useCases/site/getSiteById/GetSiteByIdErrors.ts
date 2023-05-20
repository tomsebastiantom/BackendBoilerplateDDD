import { UseCaseError } from '../../../../../shared/core/UseCaseError';
import { Result } from '../../../../../shared/core/Result';



export namespace GetSiteByIdErrors {
  export class SiteIdNotFoundError extends Result<UseCaseError> {
    constructor(siteId: string) {
      super(false, {
        message: `Site with ID ${siteId} not found`
      } as UseCaseError);
    }
  }
  export class TenantIdNotFoundError extends Result<UseCaseError> {
    constructor(siteId: string) {
      super(false, {
        message: `Site with ID ${siteId} not found`
      } as UseCaseError);
    }
  }
}
