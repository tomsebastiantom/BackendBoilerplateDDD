import { CreateCheckpointUseCase } from './CreateCheckpointUseCase';
import { CreateCheckpointController } from './CreateCheckpointController';

import { checkpointRepo } from '../../../repos';

const createCheckpointUseCase = new CreateCheckpointUseCase(checkpointRepo);
const createCheckpointController = new CreateCheckpointController(
  createCheckpointUseCase
);

export { createCheckpointUseCase, createCheckpointController };
