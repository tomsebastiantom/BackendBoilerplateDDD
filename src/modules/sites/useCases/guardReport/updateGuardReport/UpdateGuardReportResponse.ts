import { Either, Result } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { UpdateGuardReportErrors } from './UpdateGuardReportErrors';
import { GuardReport } from '../../../domain/guardReport';

export type UpdateGuardReportResponse = Either<
  | UpdateGuardReportErrors.ReportIdNotFoundError
  | AppError.UnexpectedError,
  | Result<void>
  | Result<GuardReport>
>;
