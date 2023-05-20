import { Either,Result } from "../../../../../shared/core/Result";
import { AppError } from "../../../../../shared/core/AppError";
import { UpdateSiteErrors } from "./UpdateSiteErrors";

export type UpdateSiteResponse = Either<
  UpdateSiteErrors.SiteIdNotFoundError |
  AppError.UnexpectedError ,
  Result<any>|
  Result<void>
>