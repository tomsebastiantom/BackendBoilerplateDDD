import { UseCaseError } from '../../../../../shared/core/UseCaseError';
import { Result } from '../../../../../shared/core/Result';

import { SiteId } from '../../../domain/siteId';
import { Address } from '../../../../../shared/nexa/address';

export namespace UpdateSiteErrors {
  export class SiteIdNotFoundError extends Result<UseCaseError> {
    constructor(siteId: SiteId) {
      super(false, {
        message: `Site with ID ${siteId} not found`
      } as UseCaseError);
    }
  }
  export class AddressNotValidError extends Result<UseCaseError> {
    constructor(address: Address) {
      super(false, {
        message: ` ${address} is not a valid address`
      } as UseCaseError);
    }
  }
}
