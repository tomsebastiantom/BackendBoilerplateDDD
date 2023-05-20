import express from 'express';
import { createGuardReportController } from '../../../useCases/guardReport/createGuardReport';
import { deleteGuardReportController } from '../../../useCases/guardReport/deleteGuardReport';
import { getGuardReportByIdController } from '../../../useCases/guardReport/getGuardReportById';
import { getGuardReportBySiteIdController } from '../../../useCases/guardReport/getGuardReportBySiteId';
import { updateGuardReportController } from '../../../useCases/guardReport/updateGuardReport';
import { getGuardReportByUserIdController } from '../../../useCases/guardReport/getGuardReportByUserId';

const guardReportRouter = express.Router();

guardReportRouter.post('/', (req, res) =>
  createGuardReportController.execute(req, res)
);
guardReportRouter.get('/:siteId', (req, res) =>
  getGuardReportBySiteIdController.execute(req, res)
);

guardReportRouter.get('/:userId', (req, res) =>
  getGuardReportByUserIdController.execute(req, res)
);

guardReportRouter.get('/:guardReportId', (req, res) =>
  getGuardReportByIdController.execute(req, res)
);

guardReportRouter.put('/:guardReportId', (req, res) =>
  updateGuardReportController.execute(req, res)
);

guardReportRouter.delete('/:guardReportId', (req, res) =>
  deleteGuardReportController.execute(req, res)
);
guardReportRouter.delete('/:siteId', (req, res) =>
  deleteGuardReportController.execute(req, res)
);

export { guardReportRouter };
