import express from 'express';

import { middleware } from '../../../../../shared/infra/http';
import { DecodedExpressRequest } from '../../../../users/infra/http/models/decodedRequest';
import { databaseService } from '../../../../../shared/services';
import { PrismaIncidentReportRepo } from '../../../repos/implementations/prismaIncidentReportRepo';
import { CreateIncidentReportUseCase } from '../../../useCases/incidentReport/createIncidentReport/CreateIncidentReportUseCase';
import { DeleteIncidentReportUseCase } from '../../../useCases/incidentReport/deleteIncidentReport/DeleteIncidentReportUseCase';
import { GetIncidentReportBySiteIdUseCase } from '../../../useCases/incidentReport/getIncidentReportBySideId/GetIncidentReportBySiteIdUseCase';
import { GetIncidentReportByIdUseCase } from '../../../useCases/incidentReport/getIncidentByIdReport/GetIncidentReportByIdUseCase';
import { GetIncidentReportByUserIdUseCase } from '../../../useCases/incidentReport/getIncidentReportByUserId/GetIncidentReportByUserIdUseCase';
import { UpdateIncidentReportUseCase } from '../../../useCases/incidentReport/updateIncidentReport/UpdateIncidentReportUseCase';
import { CreateIncidentReportController } from '../../../useCases/incidentReport/createIncidentReport/CreateIncidentReportController';
import { DeleteIncidentReportController } from '../../../useCases/incidentReport/deleteIncidentReport/DeleteIncidentReportController';
import { GetIncidentReportBySiteIdController } from '../../../useCases/incidentReport/getIncidentReportBySideId/GetIncidentReportBySiteIdController';
import { GetIncidentReportByIdController } from '../../../useCases/incidentReport/getIncidentByIdReport/GetIncidentReportByIdController';
import { GetIncidentReportByUserIdController } from '../../../useCases/incidentReport/getIncidentReportByUserId/GetIncidentReportByUserIdController';
import { UpdateIncidentReportController } from '../../../useCases/incidentReport/updateIncidentReport/UpdateIncidentReportController';

const incidentReportRouter = express.Router();
incidentReportRouter.use(middleware.ensureAuthenticated());

// Create Incident Report
incidentReportRouter.post('/', (req: DecodedExpressRequest, res) => {
  const prismaIncidentReportRepo = new PrismaIncidentReportRepo(
    databaseService.getDBclient(req.decoded.tenantId as string)
  );
  const createIncidentReportUseCase = new CreateIncidentReportUseCase(
    prismaIncidentReportRepo
  );
  const createIncidentReportController = new CreateIncidentReportController(
    createIncidentReportUseCase
  );
  createIncidentReportController.execute(req, res);
});

// Delete Incident Report
incidentReportRouter.delete(
  '/:incidentReportId',
  (req: DecodedExpressRequest, res) => {
    const prismaIncidentReportRepo = new PrismaIncidentReportRepo(
      databaseService.getDBclient(req.decoded.tenantId as string)
    );
    const deleteIncidentReportUseCase = new DeleteIncidentReportUseCase(
      prismaIncidentReportRepo
    );
    const deleteIncidentReportController = new DeleteIncidentReportController(
      deleteIncidentReportUseCase
    );
    deleteIncidentReportController.execute(req, res);
  }
);

// Update Incident Report
incidentReportRouter.put(
  '/:incidentReportId',
  (req: DecodedExpressRequest, res) => {
    const prismaIncidentReportRepo = new PrismaIncidentReportRepo(
      databaseService.getDBclient(req.decoded.tenantId as string)
    );
    const updateIncidentReportUseCase = new UpdateIncidentReportUseCase(
      prismaIncidentReportRepo
    );
    const updateIncidentReportController = new UpdateIncidentReportController(
      updateIncidentReportUseCase
    );
    updateIncidentReportController.execute(req, res);
  }
);

// Get Incident Report by Site ID
incidentReportRouter.get('/:siteId', (req: DecodedExpressRequest, res) => {
  const prismaIncidentReportRepo = new PrismaIncidentReportRepo(
    databaseService.getDBclient(req.decoded.tenantId as string)
  );
  const getIncidentReportBySiteIdUseCase = new GetIncidentReportBySiteIdUseCase(
    prismaIncidentReportRepo
  );
  const getIncidentReportBySiteIdController =
    new GetIncidentReportBySiteIdController(getIncidentReportBySiteIdUseCase);
  getIncidentReportBySiteIdController.execute(req, res);
});

// Get Incident Report by ID
incidentReportRouter.get(
  '/:incidentReportId',
  (req: DecodedExpressRequest, res) => {
    const prismaIncidentReportRepo = new PrismaIncidentReportRepo(
      databaseService.getDBclient(req.decoded.tenantId as string)
    );
    const getIncidentReportByIdUseCase = new GetIncidentReportByIdUseCase(
      prismaIncidentReportRepo
    );
    const getIncidentReportByIdController = new GetIncidentReportByIdController(
      getIncidentReportByIdUseCase
    );
    getIncidentReportByIdController.execute(req, res);
  }
);

// Get Incident Report by User ID
incidentReportRouter.get('/:userId', (req: DecodedExpressRequest, res) => {
  const prismaIncidentReportRepo = new PrismaIncidentReportRepo(
    databaseService.getDBclient(req.decoded.tenantId as string)
  );
  const getIncidentReportByUserIdUseCase = new GetIncidentReportByUserIdUseCase(
    prismaIncidentReportRepo
  );
  const getIncidentReportByUserIdController =
    new GetIncidentReportByUserIdController(getIncidentReportByUserIdUseCase);
  getIncidentReportByUserIdController.execute(req, res);
});

export { incidentReportRouter };
