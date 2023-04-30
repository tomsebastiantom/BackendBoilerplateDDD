
import { Either,Result } from "../../../../../shared/core/Result";
import { ActivateCheckpointErrors } from "./ActivateCheckpointErrors";
import { AppError } from "../../../../../shared/core/AppError";

export type ActivateCheckpointResponse = Either<
  ActivateCheckpointErrors.CheckpointIdNotFoundError |
  AppError.UnexpectedError |
  Result<any>,
  Result<void>
>