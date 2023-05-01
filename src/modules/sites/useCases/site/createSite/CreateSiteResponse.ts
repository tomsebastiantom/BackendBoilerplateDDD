
import { Either,Result } from "../../../../../shared/core/Result";
import { AppError } from "../../../../../shared/core/AppError";
import { CreateCheckpointErrors } from "./CreateCheckpointErrors";

export type CreateCheckpointResponse = Either<
  CreateCheckpointErrors.SiteIdNotFoundError |
  AppError.UnexpectedError |
  Result<any>,
  Result<void>
>