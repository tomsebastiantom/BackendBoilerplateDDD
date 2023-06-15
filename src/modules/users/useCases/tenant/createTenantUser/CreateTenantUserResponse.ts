import { Either, Result } from '../../../../../shared/core/Result';
import { CreateTenantUserErrors } from './CreateTenantUserErrors';
import { AppError } from '../../../../../shared/core/AppError';

export type CreateTenantUserResponse = Either<
  | CreateTenantUserErrors.EmailAlreadyExistsError
  | CreateTenantUserErrors.UsernameTakenError
  | AppError.UnexpectedError
  | Result<any>,
  Result<void>
>;
