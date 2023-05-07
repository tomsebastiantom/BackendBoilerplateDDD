import { Either, Result } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { CreateSiteErrors } from './CreateIncidentReportErrors';

export type CreateSiteResponse = Either<
  | CreateSiteErrors.AddressNotValidError
  | AppError.UnexpectedError
  | Result<any>,
  Result<void>
>;
