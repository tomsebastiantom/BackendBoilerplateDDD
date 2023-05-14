import { Either, Result } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { GetIncidentReportErrors } from './GetIncidentReportErrors';

export type GetIncidentReportResponse = Either<
  | GetIncidentReportErrors.AddressNotValidError
  | AppError.UnexpectedError
  | Result<any>,
  Result<void>
>;
