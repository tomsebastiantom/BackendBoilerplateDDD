import express from 'express';

import { middleware, requestMiddleware } from '../../../../../shared/infra/http';
import { databaseService } from '../../../../../shared/services';
import { DecodedExpressRequest } from '../../../../users/infra/http/models/decodedRequest';
import { PrismaSiteRepo } from '../../../repos/implementations/prismaSiteRepo';
import { CreateSiteController } from '../../../useCases/site/createSite/CreateSiteController';
import { CreateSiteUseCase } from '../../../useCases/site/createSite/CreateSiteUseCase';
import { DeleteSiteController } from '../../../useCases/site/deleteSite/DeleteSiteController';
import { DeleteSiteUseCase } from '../../../useCases/site/deleteSite/DeleteSiteUseCase';
import { GetSiteByIdController } from '../../../useCases/site/getSiteById/GetSiteByIdController';
import { GetSiteByIdUseCase } from '../../../useCases/site/getSiteById/GetSiteByIdUseCase';
import { UpdateSiteController } from '../../../useCases/site/updateSite/UpdateSiteController';
import { UpdateSiteUseCase } from '../../../useCases/site/updateSite/UpdateSiteUseCase';

async function createPrismaSiteRepo(req: DecodedExpressRequest) {
  const dbClient = await databaseService.getDBclient(req.decoded.tenantId as string);
  return new PrismaSiteRepo(dbClient);
}

// Factory function to generate use case and controller
function generateController(useCaseClass, controllerClass) {
  return async (req, res) => {
    const prismaSiteRepo = await createPrismaSiteRepo(req);
    const useCase = new useCaseClass(prismaSiteRepo);
    const controller = new controllerClass(useCase);
    controller.execute(req, res);
  };
}

// Route handlers
const deleteSiteHandler = generateController(DeleteSiteUseCase, DeleteSiteController);
const updateSiteHandler = generateController(UpdateSiteUseCase, UpdateSiteController);
const createSiteHandler = generateController(CreateSiteUseCase, CreateSiteController);
const getSiteByIdHandler = generateController(GetSiteByIdUseCase, GetSiteByIdController);

// Routes
const siteRouter = express.Router();
siteRouter.use(middleware.ensureAuthenticated());

siteRouter.post('/',requestMiddleware.updateSiteRequestParams(), createSiteHandler);
siteRouter.delete('/:siteId', requestMiddleware.updateSiteRequestParams(), deleteSiteHandler);
siteRouter.put('/:siteId', requestMiddleware.updateSiteRequestParams(), updateSiteHandler);
siteRouter.get('/', requestMiddleware.updateSiteRequestParams(), getSiteByIdHandler);
siteRouter.get('/:siteId', requestMiddleware.updateSiteRequestParams(), getSiteByIdHandler);
export { siteRouter };
