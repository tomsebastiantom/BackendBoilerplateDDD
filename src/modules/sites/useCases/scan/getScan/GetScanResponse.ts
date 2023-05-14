
import { Either,Result } from "../../../../../shared/core/Result";
import { ArchiveSiteErrors } from "./ArchiveSiteErrors";
import { AppError } from "../../../../../shared/core/AppError";

export type ArchiveSiteResponse = Either<
  ArchiveSiteErrors.SiteIdNotFoundError |
  AppError.UnexpectedError |
  Result<any>,
  Result<void>
>