
import { AppError } from '../../../../../shared/core/AppError';
import { Either, Result } from '../../../../../shared/core/Result';
import { UpdateScanErrors } from './UpdateScanErrors';

export type UpdateScanResponse = Either<
  UpdateScanErrors.ScanIdNotValidError |
  AppError.UnexpectedError ,
  Result<any>|
  Result<void>
>