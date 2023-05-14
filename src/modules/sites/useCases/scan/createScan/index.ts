import { siteRepo } from '../../../repos';
import { CreateSiteController } from './CreateSiteController';
import { CreateSiteUseCase } from './CreateSiteUseCase';

const createSiteUseCase = new CreateSiteUseCase(siteRepo);
const createSiteController = new CreateSiteController(createSiteUseCase);

export { createSiteUseCase, createSiteController };