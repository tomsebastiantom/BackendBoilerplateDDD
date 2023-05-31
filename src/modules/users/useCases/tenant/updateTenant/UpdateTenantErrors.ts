import { Result } from '../../../../../shared/core/Result';
import { UseCaseError } from '../../../../../shared/core/UseCaseError';

export namespace UpdateTenantErrors {
  export class TenantIdNotFoundError extends Result<UseCaseError> {
    constructor(tenantId: string) {
      super(false, {
        message: `The tenant id ${tenantId} was not found`
      } as UseCaseError);
    }
  }


}
