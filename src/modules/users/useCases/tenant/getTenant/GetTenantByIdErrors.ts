import { UseCaseError } from '../../../../../shared/core/UseCaseError';
import { Result } from '../../../../../shared/core/Result';

export namespace GetTenantByIdErrors{
  export class TenantNotFoundError extends Result<UseCaseError> {
    constructor(tenantId: string) {
      super(false, {
        message: `No tenant with the Id ${tenantId} was found`
      } as UseCaseError);
    }
  }
}
