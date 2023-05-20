import { Either, Result } from '../../../../../shared/core/Result';
import { UpdateCheckpointErrors } from './UpdateCheckpointErrors';
import { AppError } from '../../../../../shared/core/AppError';
import { Checkpoint } from '../../../domain/checkpoint';

export type UpdateCheckpointResponse = Either<
  UpdateCheckpointErrors.CheckpointIdNotFoundError | AppError.UnexpectedError,
  Result<Checkpoint> | Result<void>
>;
