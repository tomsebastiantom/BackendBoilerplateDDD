import { GetCheckpointUseCase } from './GetCheckpointUseCase';
import { GetCheckpointController } from './GetCheckpointController';

import { checkpointRepo } from '../../../repos';

const getCheckpointUseCase = new GetCheckpointUseCase(checkpointRepo);

const getCheckpointController = new GetCheckpointController(
  getCheckpointUseCase
);

export { getCheckpointUseCase, getCheckpointController };
