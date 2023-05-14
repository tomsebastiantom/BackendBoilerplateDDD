import { Result } from '../../../../../shared/core/Result';
import { UseCaseError } from '../../../../../shared/core/UseCaseError';
import { Address } from '../../../../../shared/nexa/address';

export namespace CreateScanErrors {
  export class AddressNotValidError extends Result<UseCaseError> {
    constructor(address: Address) {
      super(false, {
        message: ` ${address} is not a valid address`
      } as UseCaseError);
    }
  }
}
