import { AppError } from '../../../../../shared/core/AppError';
import { Either, Result } from '../../../../../shared/core/Result';
import { GuardReport } from '../../../domain/guardReport';
import { GetGuardReportByIdErrors } from './GetGuardReportByIdErrors';

export type GetGuardReportByIdResponse = Either<
  GetGuardReportByIdErrors.ReportIdNotFoundError | AppError.UnexpectedError,
  Result<void> | Result<GuardReport>
>;
