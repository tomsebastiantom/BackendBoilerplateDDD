
import { Either,Result } from "../../../../../shared/core/Result";
import { DeactivateSiteErrors } from "./DeactivateSiteErrors";
import { AppError } from "../../../../../shared/core/AppError";

export type DeactivateSiteResponse = Either<
  DeactivateSiteErrors.SiteIdNotFoundError |
  AppError.UnexpectedError |
  Result<any>,
  Result<void>
>