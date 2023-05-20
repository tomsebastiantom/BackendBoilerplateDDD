import { Either, Result } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { GetIncidentReportBySiteIdErrors } from './GetIncidentReportBySiteIdErrors';
import { IncidentReport } from '../../../domain/incidentReport';

export type GetIncidentReportBySiteIdResponse = Either<
  | GetIncidentReportBySiteIdErrors.IncidentIdForSiteIdNotValidError
  | AppError.UnexpectedError,
  Result<IncidentReport | IncidentReport[]> | Result<void>
>;
