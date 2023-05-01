import { UpdateCheckpointUseCase } from './UpdateCheckpointUseCase';
import { UpdateCheckpointController } from './UpdateCheckpointController';

import { checkpointRepo } from '../../../repos';

const updateCheckpointUseCase = new UpdateCheckpointUseCase(checkpointRepo);

const updateCheckpointController = new UpdateCheckpointController(
  updateCheckpointUseCase
);

export { updateCheckpointUseCase, updateCheckpointController };
