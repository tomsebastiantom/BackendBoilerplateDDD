import { AppError } from '../../../../../shared/core/AppError';
import { Either, Result } from '../../../../../shared/core/Result';
import { IncidentReport } from '../../../domain/incidentReport';
import { UpdateIncidentReportErrors } from './UpdateIncidentReportErrors';

export type UpdateIncidentReportResponse = Either<
  | UpdateIncidentReportErrors.IncidentReportIdNotValidError
  | AppError.UnexpectedError,
   Result<IncidentReport>|
  Result<void>
>;
