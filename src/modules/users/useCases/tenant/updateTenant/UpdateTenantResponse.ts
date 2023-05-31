import { AppError } from '../../../../../shared/core/AppError';
import { Either, Result } from '../../../../../shared/core/Result';
import { Tenant } from '../../../domain/tenant';
import { UpdateTenantErrors } from './UpdateTenantErrors';

export type UpdateTenantResponse = Either<
  | UpdateTenantErrors.TenantIdNotFoundError
  | AppError.UnexpectedError,
  Result<Tenant> | Result<void>
>;
