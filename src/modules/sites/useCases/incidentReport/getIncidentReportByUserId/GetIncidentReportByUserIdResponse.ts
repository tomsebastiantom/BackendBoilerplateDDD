import { Either, Result } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { GetIncidentReportByUserIdErrors } from './GetIncidentReportByUserIdErrors';

export type GetIncidentReportByUserIdResponse = Either<
  | GetIncidentReportByUserIdErrors.UserIdNotValidError
  | AppError.UnexpectedError,
  Result<any> | Result<void>
>;
