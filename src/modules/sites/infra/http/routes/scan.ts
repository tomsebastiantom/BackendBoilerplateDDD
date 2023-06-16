import express from 'express';

import { middleware } from '../../../../../shared/infra/http';
import { DecodedExpressRequest } from '../../../../users/infra/http/models/decodedRequest';
import { databaseService } from '../../../../../shared/services';
import { PrismaScanRepo } from '../../../repos/implementations/prismaScanRepo';
import { CreateScanUseCase } from '../../../useCases/scan/createScan/CreateScanUseCase';
import { DeleteScanUseCase } from '../../../useCases/scan/deleteScan/DeleteScanUseCase';
import { GetScanByIdUseCase } from '../../../useCases/scan/getScanById/GetScanByIdUseCase';
import { UpdateScanUseCase } from '../../../useCases/scan/updateScan/UpdateScanUseCase';
import { UpdateScanController } from '../../../useCases/scan/updateScan/UpdateScanController';
import { DeleteScanController } from '../../../useCases/scan/deleteScan/DeleteScanController';
import { CreateScanController } from '../../../useCases/scan/createScan/CreateScanController';
import { GetScanByIdController } from '../../../useCases/scan/getScanById/GetScanByIdController';
import { PrismaCheckpointRepo } from '../../../repos/implementations/prismaCheckpointRepo';

const scanRouter = express.Router();

scanRouter.use(middleware.ensureAuthenticated());

scanRouter.post('/', async (req: DecodedExpressRequest, res) => {
  const prismaScanRepo = new PrismaScanRepo(
    await databaseService.getDBclient(req.decoded.tenantId as string)
  );
  const prismaCheckpointRepo = new PrismaCheckpointRepo(
    await databaseService.getDBclient(req.decoded.tenantId as string)
  );
  const createScanUseCase = new CreateScanUseCase(
    prismaScanRepo,
    prismaCheckpointRepo
  );
  const createScanController = new CreateScanController(createScanUseCase);
  createScanController.execute(req, res);
});

scanRouter.delete('/:scanId', async (req: DecodedExpressRequest, res) => {
  const prismaScanRepo = new PrismaScanRepo(
    await databaseService.getDBclient(req.decoded.tenantId as string)
  );
  const deleteScanUseCase = new DeleteScanUseCase(prismaScanRepo);
  const deleteScanController = new DeleteScanController(deleteScanUseCase);
  deleteScanController.execute(req, res);
});
scanRouter.delete('/:siteId',async (req: DecodedExpressRequest, res) => {
  const prismaScanRepo = new PrismaScanRepo(
    await databaseService.getDBclient(req.decoded.tenantId as string)
  );
  const deleteScanUseCase = new DeleteScanUseCase(prismaScanRepo);
  const deleteScanController = new DeleteScanController(deleteScanUseCase);
  deleteScanController.execute(req, res);
});
scanRouter.delete('/:checkpointId', async (req: DecodedExpressRequest, res) => {
  const prismaScanRepo = new PrismaScanRepo(
   await databaseService.getDBclient(req.decoded.tenantId as string)
  );
  const deleteScanUseCase = new DeleteScanUseCase(prismaScanRepo);
  const deleteScanController = new DeleteScanController(deleteScanUseCase);
  deleteScanController.execute(req, res);
});

scanRouter.put('/:scanId', async (req: DecodedExpressRequest, res) => {
  const prismaScanRepo = new PrismaScanRepo(
   await databaseService.getDBclient(req.decoded.tenantId as string)
  );
  const prismaCheckpointRepo = new PrismaCheckpointRepo(
    databaseService.getDBclient(req.decoded.tenantId as string)
  );

  const updateScanUseCase = new UpdateScanUseCase(
    prismaScanRepo,
    prismaCheckpointRepo
  );
  const updateScanController = new UpdateScanController(updateScanUseCase);
  updateScanController.execute(req, res);
});

scanRouter.get('/:scanId', async (req: DecodedExpressRequest, res) => {
  const prismaScanRepo = new PrismaScanRepo(
    await databaseService.getDBclient(req.decoded.tenantId as string)
  );
  const getScanByIdUseCase = new GetScanByIdUseCase(prismaScanRepo);
  const getScanByIdController = new GetScanByIdController(getScanByIdUseCase);
  getScanByIdController.execute(req, res);
});
scanRouter.get('/:userId', async (req: DecodedExpressRequest, res) => {
  const prismaScanRepo = new PrismaScanRepo(
   await databaseService.getDBclient(req.decoded.tenantId as string)
  );
  const getScanByIdUseCase = new GetScanByIdUseCase(prismaScanRepo);
  const getScanByIdController = new GetScanByIdController(getScanByIdUseCase);
  getScanByIdController.execute(req, res);
});
scanRouter.get('/:checkpointId', async (req: DecodedExpressRequest, res) => {
  const prismaScanRepo = new PrismaScanRepo(
   await databaseService.getDBclient(req.decoded.tenantId as string)
  );
  const getScanByIdUseCase = new GetScanByIdUseCase(prismaScanRepo);
  const getScanByIdController = new GetScanByIdController(getScanByIdUseCase);
  getScanByIdController.execute(req, res);
});
scanRouter.get('/:siteId', async (req: DecodedExpressRequest, res) => {
  const prismaScanRepo = new PrismaScanRepo(
   await databaseService.getDBclient(req.decoded.tenantId as string)
  );
  const getScanByIdUseCase = new GetScanByIdUseCase(prismaScanRepo);
  const getScanByIdController = new GetScanByIdController(getScanByIdUseCase);
  getScanByIdController.execute(req, res);
});

export { scanRouter };
