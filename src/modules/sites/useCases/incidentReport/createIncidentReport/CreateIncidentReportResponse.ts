import { Either, Result } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { CreateIncidentReportErrors } from './CreateIncidentReportErrors';
import { IncidentReport } from '../../../domain/incidentReport';

export type CreateIncidentReportResponse = Either<
  CreateIncidentReportErrors.SiteIdNotValidError | AppError.UnexpectedError,
  Result<IncidentReport> | Result<void>
>;
