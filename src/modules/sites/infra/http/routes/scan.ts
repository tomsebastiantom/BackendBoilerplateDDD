import express from 'express'

import { createScanController } from '../../../useCases/scan/createScan';
import { updateScanController } from '../../../useCases/scan/updateScan';
import { deleteScanController } from '../../../useCases/scan/deleteScan';
import { getScanByIdController } from '../../../useCases/scan/getScanById';

const scanRouter = express.Router();


scanRouter.post('/',
  (req, res) => createScanController.execute(req, res)
)

scanRouter.delete('/:scanId',
  (req, res) => deleteScanController.execute(req, res)
)
scanRouter.delete('/:siteId',
  (req, res) => deleteScanController.execute(req, res)
)
scanRouter.delete('/:checkpointId',
  (req, res) => deleteScanController.execute(req, res)
)

scanRouter.put('/:scanId',
  (req, res) => updateScanController.execute(req, res)
)

scanRouter.get('/:scanId',
  (req, res) =>getScanByIdController.execute(req, res)
)
scanRouter.get('/:userId',
  (req, res) =>getScanByIdController.execute(req, res)
)
scanRouter.get('/:checkpointId',
  (req, res) =>getScanByIdController.execute(req, res)
)
scanRouter.get('/:siteId',
  (req, res) =>getScanByIdController.execute(req, res)
)

export {
  scanRouter
}