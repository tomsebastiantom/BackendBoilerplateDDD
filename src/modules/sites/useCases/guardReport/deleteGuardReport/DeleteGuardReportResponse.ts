import { Either, Result } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { DeleteGuardReportErrors } from './DeleteGuardReportErrors';

export type DeleteGuardReportResponse = Either<
  | DeleteGuardReportErrors.GuardReportIdNotValidError
  | AppError.UnexpectedError
  | Result<any>,
  Result<void>
>;
