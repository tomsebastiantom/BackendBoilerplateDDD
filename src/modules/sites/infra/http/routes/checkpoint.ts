import express from 'express';

import { middleware } from '../../../../../shared/infra/http';
import { PrismaCheckpointRepo } from '../../../repos/implementations/prismaCheckpointRepo';
import { DeleteCheckpointController } from '../../../useCases/checkpoint/deleteCheckpoint/DeleteCheckpointController';
import { UpdateCheckpointController } from '../../../useCases/checkpoint/updateCheckpoint/UpdateCheckpointController';
import { GetCheckpointController } from '../../../useCases/checkpoint/getCheckpoint/GetCheckpointController';
import { GetCheckpointBySiteIdController } from '../../../useCases/checkpoint/getCheckpointBySiteId/GetCheckpointBySiteIdController';
import { CreateCheckpointController } from '../../../useCases/checkpoint/createCheckpoint/CreateCheckpointController';
import { DeleteCheckpointUseCase } from '../../../useCases/checkpoint/deleteCheckpoint/DeleteCheckpointUseCase';
import { UpdateCheckpointUseCase } from '../../../useCases/checkpoint/updateCheckpoint/UpdateCheckpointUseCase';
import { GetCheckpointUseCase } from '../../../useCases/checkpoint/getCheckpoint/GetCheckpointUseCase';
import { GetCheckpointBySiteIdUseCase } from '../../../useCases/checkpoint/getCheckpointBySiteId/GetCheckpointBySiteIdUseCase';
import { CreateCheckpointUseCase } from '../../../useCases/checkpoint/createCheckpoint/CreateCheckpointUseCase';
import { databaseService } from '../../../../../shared/services';
import { DecodedExpressRequest } from '../../../../users/infra/http/models/decodedRequest';

const checkpointRouter = express.Router();

checkpointRouter.post(
  '/',
  middleware.ensureAuthenticated(),
  async (req: DecodedExpressRequest, res) => {
    const prismaCheckpointRepo = new PrismaCheckpointRepo(
      await databaseService.getDBclient(req.decoded.tenantId as string)
    );
    const createCheckpointUseCase = new CreateCheckpointUseCase(
      prismaCheckpointRepo
    );
    const createCheckpointController = new CreateCheckpointController(
      createCheckpointUseCase
    );
    createCheckpointController.execute(req, res);
  }
);

checkpointRouter.delete('/:checkpointId', async (req: DecodedExpressRequest, res) => {
  const prismaCheckpointRepo = new PrismaCheckpointRepo(
    await databaseService.getDBclient(req.decoded.tenantId as string)
  );
  const deleteCheckpointUseCase = new DeleteCheckpointUseCase(
    prismaCheckpointRepo
  );
  const deleteCheckpointController = new DeleteCheckpointController(
    deleteCheckpointUseCase
  );
  deleteCheckpointController.execute(req, res);
});

checkpointRouter.put('/:checkpointId', async (req: DecodedExpressRequest, res) => {
  const prismaCheckpointRepo = new PrismaCheckpointRepo(
   await databaseService.getDBclient(req.decoded.tenantId as string)
  );
  const updateCheckpointUseCase = new UpdateCheckpointUseCase(
    prismaCheckpointRepo
  );
  const updateCheckpointController = new UpdateCheckpointController(
    updateCheckpointUseCase
  );
  updateCheckpointController.execute(req, res);
});

checkpointRouter.get('/:siteId', async (req: DecodedExpressRequest, res) => {
  const prismaCheckpointRepo = new PrismaCheckpointRepo(
    await databaseService.getDBclient(req.decoded.tenantId as string)
  );
  const getCheckpointBySiteIdUseCase = new GetCheckpointBySiteIdUseCase(
    prismaCheckpointRepo
  );
  const getCheckpointBySiteIdController = new GetCheckpointBySiteIdController(
    getCheckpointBySiteIdUseCase
  );
  getCheckpointBySiteIdController.execute(req, res);
});

checkpointRouter.get('/:checkpointId', async (req: DecodedExpressRequest, res) => {
  const prismaCheckpointRepo = new PrismaCheckpointRepo(
    await databaseService.getDBclient(req.decoded.tenantId as string)
  );
  const getCheckpointUseCase = new GetCheckpointUseCase(prismaCheckpointRepo);
  const getCheckpointController = new GetCheckpointController(
    getCheckpointUseCase
  );
  getCheckpointController.execute(req, res);
});

export { checkpointRouter };
