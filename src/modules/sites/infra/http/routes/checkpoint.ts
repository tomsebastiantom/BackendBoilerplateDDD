import express from 'express';

import { createCheckpointController } from '../../../useCases/checkpoint/createCheckpoint';
import { deleteCheckpointController } from '../../../useCases/checkpoint/deleteCheckpoint';
import { getCheckpointController } from '../../../useCases/checkpoint/getCheckpoint';
import { updateCheckpointController } from '../../../useCases/checkpoint/updateCheckpoint';
import { getCheckpointBySiteIdController } from '../../../useCases/checkpoint/getCheckpointBySiteId';

const checkpointRouter = express.Router();

checkpointRouter.post('/',
  (req, res) => createCheckpointController.execute(req, res)
)
checkpointRouter.delete('/:checkpointId',
  (req, res) => deleteCheckpointController.execute(req, res)
)
checkpointRouter.put('/:checkpointId',
  (req, res) => updateCheckpointController.execute(req, res)
)
checkpointRouter.get('/:siteId',
  (req, res) => getCheckpointBySiteIdController.execute(req, res)
)
checkpointRouter.get('/:checkpointId',
  (req, res) => getCheckpointController.execute(req, res)
)

export {
  checkpointRouter
}