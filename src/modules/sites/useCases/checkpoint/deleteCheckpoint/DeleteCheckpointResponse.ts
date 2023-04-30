
import { Either,Result } from "../../../../../shared/core/Result";
import { DeleteCheckpointErrors } from "./DeleteCheckpointErrors";
import { AppError } from "../../../../../shared/core/AppError";

export type DeleteCheckpointResponse = Either<
  DeleteCheckpointErrors.CheckpointIdNotFoundError |
  AppError.UnexpectedError |
  Result<any>,
  Result<void>
>