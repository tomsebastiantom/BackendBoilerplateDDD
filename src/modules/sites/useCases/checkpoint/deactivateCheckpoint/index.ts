import { DeactivateCheckpointController } from './DeactivateCheckpointController';
import { DeactivateCheckpointUseCase } from './DeactivateCheckpointUseCase';

import { checkpointRepo } from '../../../repos';

const deactivateCheckpointUseCase = new DeactivateCheckpointUseCase(
  checkpointRepo
);
const deactivateCheckpointController = new DeactivateCheckpointController(
  deactivateCheckpointUseCase
);

export { deactivateCheckpointUseCase, deactivateCheckpointController };
