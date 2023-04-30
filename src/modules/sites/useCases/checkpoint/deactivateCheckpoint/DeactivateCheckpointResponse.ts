
import { Either,Result } from "../../../../../shared/core/Result";
import { DeactivateCheckpointErrors } from "./DeactivateCheckpointErrors";
import { AppError } from "../../../../../shared/core/AppError";

export type DeactivateCheckpointResponse = Either<
  DeactivateCheckpointErrors.CheckpointIdNotFoundError |
  AppError.UnexpectedError |
  Result<any>,
  Result<void>
>