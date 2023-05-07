
import { Either,Result } from "../../../../../shared/core/Result";
import { ActivateSiteErrors } from "./ActivateSiteErrors";
import { AppError } from "../../../../../shared/core/AppError";

export type ActivateSiteResponse = Either<
  ActivateSiteErrors.SiteIdNotFoundError |
  AppError.UnexpectedError |
  Result<any>,
  Result<void>
>