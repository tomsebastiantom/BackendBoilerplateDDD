import express from 'express'
import { activateCheckpointController } from '../../../useCases/checkpoint/activateCheckpoint';
import { createCheckpointController } from '../../../useCases/checkpoint/createCheckpoint';
import { deleteCheckpointController } from '../../../useCases/checkpoint/deleteCheckpoint';
import { deactivateCheckpointController } from '../../../useCases/checkpoint/deactivateCheckpoint';
import { updateCheckpointController } from '../../../useCases/checkpoint/updateCheckpoint';

const checkpointRouter = express.Router();

checkpointRouter.get('/activate',
  (req, res) => activateCheckpointController.execute(req, res)
)

checkpointRouter.get('/create',
  (req, res) => createCheckpointController.execute(req, res)
)
checkpointRouter.get('/delete',
  (req, res) => deleteCheckpointController.execute(req, res)
)
checkpointRouter.get('/deactivate',
  (req, res) => deactivateCheckpointController.execute(req, res)
)
checkpointRouter.get('/update',
  (req, res) => updateCheckpointController.execute(req, res)
)

export {
  checkpointRouter
}