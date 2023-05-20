
import { AppError } from '../../../../../shared/core/AppError';
import { Either, Result } from '../../../../../shared/core/Result';
import { GetScanByIdErrors } from './GetScanByIdErrors';

export type GetScanByIdResponse = Either<
  GetScanByIdErrors.ScanIdNotValidError |
  AppError.UnexpectedError ,
  Result<any>|
  Result<void>
>
