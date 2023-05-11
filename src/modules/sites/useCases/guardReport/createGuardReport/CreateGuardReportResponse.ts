import { Either, Result } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { CreateGuardReportErrors } from './CreateGuardReportErrors';

export type CreateGuardReportResponse = Either<
  | CreateGuardReportErrors.SiteIdNotValidError
  | AppError.UnexpectedError
  | Result<any>,
  Result<void>
>;
