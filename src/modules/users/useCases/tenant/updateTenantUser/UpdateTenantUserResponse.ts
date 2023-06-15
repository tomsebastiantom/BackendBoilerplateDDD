import { AppError } from '../../../../../shared/core/AppError';
import { Either, Result } from '../../../../../shared/core/Result';

import { User } from '../../../domain/user';
import { UpdateTenantUserErrors } from './UpdateTenantUserErrors';

export type UpdateTenantUserResponse = Either<
  | UpdateTenantUserErrors.EmailAlreadyExistsError
  | UpdateTenantUserErrors.UsernameTakenError
  | AppError.UnexpectedError,
  Result<User> | Result<void>
>;
