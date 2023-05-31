import { UseCaseError } from '../../../../../shared/core/UseCaseError';
import { Result } from '../../../../../shared/core/Result';

import { Address } from '../../../../../shared/domain/nexa/address';

export namespace CreateSiteErrors {
  export class AddressNotValidError extends Result<UseCaseError> {
    constructor(address: Address) {
      super(false, {
        message: ` ${address} is not a valid address`
      } as UseCaseError);
    }
  }
}
