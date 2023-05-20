
import { AppError } from '../../../../../shared/core/AppError';
import { Either, Result } from '../../../../../shared/core/Result';
import { DeleteScanErrors } from './DeleteScanErrors';

export type DeleteScanResponse = Either<
  DeleteScanErrors.SiteIdNotValidError |
  AppError.UnexpectedError ,
  Result<any>|
  Result<void>
>