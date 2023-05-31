import express from 'express';

import { middleware } from '../../../../../shared/infra/http';
import { DecodedExpressRequest } from '../../../../users/infra/http/models/decodedRequest';
import { databaseService } from '../../../../../shared/services';
import { GetGuardReportByIdController } from '../../../useCases/guardReport/getGuardReportById/GetGuardReportByIdController';
import { GetGuardReportBySiteIdController } from '../../../useCases/guardReport/getGuardReportBySiteId/GetGuardReportBySiteIdController';
import { GetGuardReportByUserIdController } from '../../../useCases/guardReport/getGuardReportByUserId/GetGuardReportByUserIdController';
import { CreateGuardReportController } from '../../../useCases/guardReport/createGuardReport/CreateGuardReportController';
import { DeleteGuardReportController } from '../../../useCases/guardReport/deleteGuardReport/DeleteGuardReportController';
import { UpdateGuardReportController } from '../../../useCases/guardReport/updateGuardReport/UpdateGuardReportController';
import { GetGuardReportBySiteIdUseCase } from '../../../useCases/guardReport/getGuardReportBySiteId/GetGuardReportBySiteIdUseCase';
import { GetGuardReportByUserIdUseCase } from '../../../useCases/guardReport/getGuardReportByUserId/GetGuardReportByUserIdUseCase';
import { CreateGuardReportUseCase } from '../../../useCases/guardReport/createGuardReport/CreateGuardReportUseCase';
import { DeleteGuardReportUseCase } from '../../../useCases/guardReport/deleteGuardReport/DeleteGuardReportUseCase';
import { UpdateGuardReportUseCase } from '../../../useCases/guardReport/updateGuardReport/UpdateGuardReportUseCase';
import { GetGuardReportByIdUseCase } from '../../../useCases/guardReport/getGuardReportById/GetGuardReportByIdUseCase';
import { PrismaGuardReportRepo } from '../../../repos/implementations/prismaGuardReportRepo';

const guardReportRouter = express.Router();
guardReportRouter.use(middleware.ensureAuthenticated());

guardReportRouter.post('/', (req: DecodedExpressRequest, res) => {
  const prismaGuardReportRepo = new PrismaGuardReportRepo(databaseService.getDBclient(req.decoded.tenantId as string));
  const createGuardReportUseCase = new CreateGuardReportUseCase(prismaGuardReportRepo);
  const createGuardReportController = new CreateGuardReportController(createGuardReportUseCase);
  createGuardReportController.execute(req, res);
});

guardReportRouter.get('/:siteId', (req: DecodedExpressRequest, res) => {
  const prismaGuardReportRepo = new PrismaGuardReportRepo(databaseService.getDBclient(req.decoded.tenantId as string));
  const getGuardReportBySiteIdUseCase = new GetGuardReportBySiteIdUseCase(prismaGuardReportRepo);
  const getGuardReportBySiteIdController = new GetGuardReportBySiteIdController(getGuardReportBySiteIdUseCase);
  getGuardReportBySiteIdController.execute(req, res);
});

guardReportRouter.get('/:userId', (req: DecodedExpressRequest, res) => {
  const prismaGuardReportRepo = new PrismaGuardReportRepo(databaseService.getDBclient(req.decoded.tenantId as string));
  const getGuardReportByUserIdUseCase = new GetGuardReportByUserIdUseCase(prismaGuardReportRepo);
  const getGuardReportByUserIdController = new GetGuardReportByUserIdController(getGuardReportByUserIdUseCase);
  getGuardReportByUserIdController.execute(req, res);
});

guardReportRouter.get('/:guardReportId', (req: DecodedExpressRequest, res) => {
  const prismaGuardReportRepo = new PrismaGuardReportRepo(databaseService.getDBclient(req.decoded.tenantId as string));
  const getGuardReportByIdUseCase = new GetGuardReportByIdUseCase(prismaGuardReportRepo);
  const getGuardReportByIdController = new GetGuardReportByIdController(getGuardReportByIdUseCase);
  getGuardReportByIdController.execute(req, res);
});

guardReportRouter.put('/:guardReportId', (req: DecodedExpressRequest, res) => {
  const prismaGuardReportRepo = new PrismaGuardReportRepo(databaseService.getDBclient(req.decoded.tenantId as string));
  const updateGuardReportUseCase = new UpdateGuardReportUseCase(prismaGuardReportRepo);
  const updateGuardReportController = new UpdateGuardReportController(updateGuardReportUseCase);
  updateGuardReportController.execute(req, res);
});

guardReportRouter.delete('/:guardReportId', (req: DecodedExpressRequest, res) => {
  const prismaGuardReportRepo = new PrismaGuardReportRepo(databaseService.getDBclient(req.decoded.tenantId as string));
  const deleteGuardReportUseCase = new DeleteGuardReportUseCase(prismaGuardReportRepo);
  const deleteGuardReportController = new DeleteGuardReportController(deleteGuardReportUseCase);
  deleteGuardReportController.execute(req, res);
});

export { guardReportRouter };