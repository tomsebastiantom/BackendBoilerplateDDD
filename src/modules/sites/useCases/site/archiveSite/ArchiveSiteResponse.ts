
import { Either,Result } from "../../../../../shared/core/Result";
import { ActivateCheckpointErrors } from "./ActivateCheckpointErrors";
import { AppError } from "../../../../../shared/core/AppError";

export type CreateUserResponse = Either<
  ActivateCheckpointErrors.CheckpointNotFoundError |
  AppError.UnexpectedError |
  Result<any>,
  Result<void>
>