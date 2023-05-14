import { Either, Result } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { CreateIncidentReportErrors } from './CreateIncidentReportErrors';

export type CreateIncidentReportResponse = Either<
  | CreateIncidentReportErrors.AddressNotValidError
  | AppError.UnexpectedError
  | Result<any>,
  Result<void>
>;
