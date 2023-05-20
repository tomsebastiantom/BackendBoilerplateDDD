import { Either, Result } from '../../../../../shared/core/Result';
import { GetCheckpointErrors } from './GetCheckpointErrors';
import { AppError } from '../../../../../shared/core/AppError';
import { Checkpoint } from '../../../domain/checkpoint';

export type GetCheckpointResponse = Either<
  GetCheckpointErrors.CheckpointIdNotFoundError | AppError.UnexpectedError,
  Result<Checkpoint> | Result<void>
>;
