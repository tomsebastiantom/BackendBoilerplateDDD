
import { Either,Result } from "../../../../../shared/core/Result";
import { DeleteSiteErrors } from "./DeleteSiteErrors";
import { AppError } from "../../../../../shared/core/AppError";

export type DeleteSiteResponse = Either<
  DeleteSiteErrors.SiteIdNotFoundError |
  AppError.UnexpectedError |
  Result<any>,
  Result<void>
>