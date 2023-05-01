
import { Either,Result } from "../../../../../shared/core/Result";
import { UpdateCheckpointErrors } from "./UpdateCheckpointErrors";
import { AppError } from "../../../../../shared/core/AppError";

export type UpdateCheckpointResponse = Either<
  UpdateCheckpointErrors.CheckpointIdNotFoundError |
  AppError.UnexpectedError |
  Result<any>,
  Result<void>
>