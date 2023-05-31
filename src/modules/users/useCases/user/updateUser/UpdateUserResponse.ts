import { AppError } from '../../../../../shared/core/AppError';
import { Either, Result } from '../../../../../shared/core/Result';

import { User } from '../../../domain/user';
import { UpdateUserErrors } from './UpdateUserErrors';

export type UpdateUserResponse = Either<
  | UpdateUserErrors.EmailAlreadyExistsError
  | UpdateUserErrors.UsernameTakenError
  | AppError.UnexpectedError,
  Result<User> | Result<void>
>;
