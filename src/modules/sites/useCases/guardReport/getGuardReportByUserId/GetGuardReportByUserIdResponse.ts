import { AppError } from '../../../../../shared/core/AppError';
import { Either, Result } from '../../../../../shared/core/Result';
import { GuardReport } from '../../../domain/guardReport';
import { GetGuardReportByUserIdErrors } from './GetGuardReportByUserIdErrors';

export type GetGuardReportByUserIdResponse = Either<
  | GetGuardReportByUserIdErrors.ReportForUserIdNotFoundError
  | AppError.UnexpectedError,
  Result<void> | Result<GuardReport|GuardReport[]>
>;
