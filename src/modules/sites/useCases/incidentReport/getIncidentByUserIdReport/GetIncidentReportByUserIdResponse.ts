import { Either, Result } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { GetIncidentReportByIdErrors } from './GetIncidentReportByUserIdErrors';

export type GetIncidentReportByIdResponse = Either<
  | GetIncidentReportByIdErrors.IncidentIdNotValidError
  | AppError.UnexpectedError,
  Result<any> | Result<void>
>;
