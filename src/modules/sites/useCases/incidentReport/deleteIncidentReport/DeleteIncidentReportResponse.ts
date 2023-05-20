import { Either, Result } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { DeleteIncidentReportErrors } from './DeleteIncidentReportErrors';

export type DeleteIncidentReportResponse = Either<
  | DeleteIncidentReportErrors.IncidentIdNotValidError
  | AppError.UnexpectedError
  | Result<any>,
  Result<void>
>;
