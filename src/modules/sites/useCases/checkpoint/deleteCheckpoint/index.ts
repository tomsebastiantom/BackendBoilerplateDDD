
import { checkpointRepo } from '../../../repos';
import { DeleteCheckpointUseCase } from './DeleteCheckpointUseCase';
import { DeleteCheckpointController } from './DeleteCheckpointController';

const deleteCheckpointUseCase = new DeleteCheckpointUseCase(checkpointRepo);
const deleteCheckpointController = new DeleteCheckpointController(
  deleteCheckpointUseCase
);

export { deleteCheckpointUseCase, deleteCheckpointController };
