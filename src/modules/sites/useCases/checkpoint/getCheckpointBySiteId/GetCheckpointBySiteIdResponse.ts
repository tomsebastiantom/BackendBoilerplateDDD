import { Either, Result } from '../../../../../shared/core/Result';
import { GetCheckpointBySiteIdErrors } from './GetCheckpointBySiteIdErrors';
import { AppError } from '../../../../../shared/core/AppError';
import { Checkpoint } from '../../../domain/checkpoint';

export type GetCheckpointBySiteIdResponse = Either<
  | GetCheckpointBySiteIdErrors.CheckpointForSiteIdNotFoundError
  | AppError.UnexpectedError,
  Result<Checkpoint | Checkpoint[]> | Result<void>
>;
