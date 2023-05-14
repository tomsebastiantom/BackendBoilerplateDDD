
import { AppError } from '../../../../../shared/core/AppError';
import { Either, Result } from '../../../../../shared/core/Result';
import { CreateScanErrors } from './CreateScanErrors';

export type CreateScanResponse = Either<
  CreateScanErrors.AddressNotValidError |
  AppError.UnexpectedError |
  Result<any>,
  Result<void>
>