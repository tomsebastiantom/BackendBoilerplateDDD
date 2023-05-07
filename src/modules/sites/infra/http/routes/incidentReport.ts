import express from 'express'
import { activateCheckpointController } from '../../../useCases/checkpoint/activateCheckpoint';
import { createCheckpointController } from '../../../useCases/checkpoint/createCheckpoint';
import { deleteCheckpointController } from '../../../useCases/checkpoint/deleteCheckpoint';
import { deactivateCheckpointController } from '../../../useCases/checkpoint/deactivateCheckpoint';
import { updateCheckpointController } from '../../../useCases/checkpoint/updateCheckpoint';

const checkpointRouter = express.Router();

checkpointRouter.get('/me',
  (req, res) => activateCheckpointController.execute(req, res)
)

checkpointRouter.get('/:username',
  (req, res) => createCheckpointController.execute(req, res)
)
checkpointRouter.get('/:username',
  (req, res) => deleteCheckpointController.execute(req, res)
)
checkpointRouter.get('/:username',
  (req, res) => deactivateCheckpointController.execute(req, res)
)
checkpointRouter.get('/:username',
  (req, res) => updateCheckpointController.execute(req, res)
)

export {
  checkpointRouter
}