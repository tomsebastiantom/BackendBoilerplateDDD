import { GetCheckpointBySiteIdUseCase } from './GetCheckpointBySiteIdUseCase';
import { GetCheckpointBySiteIdController } from './GetCheckpointBySiteIdController';

import { checkpointRepo } from '../../../repos';

const getCheckpointBySiteIdUseCase = new GetCheckpointBySiteIdUseCase(checkpointRepo);

const getCheckpointBySiteIdController = new GetCheckpointBySiteIdController(
  getCheckpointBySiteIdUseCase
);

export { getCheckpointBySiteIdUseCase, getCheckpointBySiteIdController };
