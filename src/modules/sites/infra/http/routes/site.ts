import express from 'express';

import { middleware } from '../../../../../shared/infra/http';
import { DecodedExpressRequest } from '../../../../users/infra/http/models/decodedRequest';
import { databaseService } from '../../../../../shared/services';
import { PrismaSiteRepo } from '../../../repos/implementations/prismaSiteRepo';
import { CreateSiteUseCase } from '../../../useCases/site/createSite/CreateSiteUseCase';
import { DeleteSiteUseCase } from '../../../useCases/site/deleteSite/DeleteSiteUseCase';
import { GetSiteByIdUseCase } from '../../../useCases/site/getSiteById/GetSiteByIdUseCase';
import { UpdateSiteUseCase } from '../../../useCases/site/updateSite/UpdateSiteUseCase';
import { UpdateSiteController } from '../../../useCases/site/updateSite/UpdateSiteController';
import { DeleteSiteController } from '../../../useCases/site/deleteSite/DeleteSiteController';
import { CreateSiteController } from '../../../useCases/site/createSite/CreateSiteController';
import { GetSiteByIdController } from '../../../useCases/site/getSiteById/GetSiteByIdController';

const siteRouter = express.Router();
siteRouter.use(middleware.ensureAuthenticated());

siteRouter.delete('/:siteId', (req: DecodedExpressRequest, res) => {
  const prismaSiteRepo = new PrismaSiteRepo(
    databaseService.getDBclient(req.decoded.tenantId as string)
  );
  const deleteSiteUseCase = new DeleteSiteUseCase(prismaSiteRepo);
  const deleteSiteController = new DeleteSiteController(deleteSiteUseCase);
  deleteSiteController.execute(req, res);
});

siteRouter.put('/:siteId', (req: DecodedExpressRequest, res) => {
  const prismaSiteRepo = new PrismaSiteRepo(
    databaseService.getDBclient(req.decoded.tenantId as string)
  );
  const updateSiteUseCase = new UpdateSiteUseCase(prismaSiteRepo);
  const updateSiteController = new UpdateSiteController(updateSiteUseCase);
  updateSiteController.execute(req, res);
});
siteRouter.post('/', (req: DecodedExpressRequest, res) => {
  const prismaSiteRepo = new PrismaSiteRepo(
    databaseService.getDBclient(req.decoded.tenantId as string)
  );
  const createSiteUseCase = new CreateSiteUseCase(prismaSiteRepo);
  const createSiteController = new CreateSiteController(createSiteUseCase);
  createSiteController.execute(req, res);
});
siteRouter.get('/:siteId', (req: DecodedExpressRequest, res) => {
  const prismaSiteRepo = new PrismaSiteRepo(
    databaseService.getDBclient(req.decoded.tenantId as string)
  );
  const getSiteByIdUseCase = new GetSiteByIdUseCase(prismaSiteRepo);
  const getSiteByIdController = new GetSiteByIdController(getSiteByIdUseCase);
  getSiteByIdController.execute(req, res);
});
siteRouter.get('/:tenantId', (req: DecodedExpressRequest, res) => {
  const prismaSiteRepo = new PrismaSiteRepo(
    databaseService.getDBclient(req.decoded.tenantId as string)
  );
  const getSiteByIdUseCase = new GetSiteByIdUseCase(prismaSiteRepo);
  const getSiteByIdController = new GetSiteByIdController(getSiteByIdUseCase);
  getSiteByIdController.execute(req, res);
});

export { siteRouter };
