import { UseCaseError } from '../../../../../shared/core/UseCaseError';
import { Result } from '../../../../../shared/core/Result';

export namespace CreateTenantErrors {
 

  export class TenantNameTakenError extends Result<UseCaseError> {
    constructor(Tenantname: string) {
      super(false, {
        message: `The Tenantname ${Tenantname} was already taken`
      } as UseCaseError);
    }
  }
}
