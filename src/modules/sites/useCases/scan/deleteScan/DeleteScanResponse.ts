
import { AppError } from '../../../../../shared/core/AppError';
import { Either, Result } from '../../../../../shared/core/Result';
import { DeleteSiteErrors } from './DeleteSiteErrors';

export type DeleteSiteResponse = Either<
  DeleteSiteErrors.SiteIdNotFoundError |
  AppError.UnexpectedError |
  Result<any>,
  Result<void>
>