import { Either, Result } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { GetSiteByIdErrors } from './GetSiteByIdErrors';

export type GetSiteByIdResponse = Either<
  | GetSiteByIdErrors.TenantIdNotFoundError
  | GetSiteByIdErrors.SiteIdNotFoundError
  | AppError.UnexpectedError,
  Result<any> | Result<void>
>;
