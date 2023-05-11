
import { Either,Result } from "../../../../../shared/core/Result";
import { GetCheckpointErrors } from "./GetCheckpointErrors";
import { AppError } from "../../../../../shared/core/AppError";

export type GetCheckpointResponse = Either<
  GetCheckpointErrors.CheckpointIdNotFoundError |
  AppError.UnexpectedError |
  Result<any>,
  Result<void>
>