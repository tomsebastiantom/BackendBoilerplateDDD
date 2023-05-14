import { AppError } from '../../../../../shared/core/AppError';
import { Either, Result } from '../../../../../shared/core/Result';
import { GuardReport } from '../../../domain/guardReport';
import { GetGuardReportBySiteIdErrors } from './GetGuardReportBySiteIdErrors';

export type GetGuardReportBySiteIdResponse = Either<
  GetGuardReportBySiteIdErrors.ReportForSiteIdNotFoundError | AppError.UnexpectedError,
  Result<void> | Result<GuardReport|GuardReport[]>
>;
