import { Either, Result } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { UpdateIncidentReportErrors } from './UpdateIncidentReportErrors';

export type UpdateIncidentReportResponse = Either<
  | UpdateIncidentReportErrors.AddressNotValidError
  | AppError.UnexpectedError
  | Result<any>,
  Result<void>
>;
