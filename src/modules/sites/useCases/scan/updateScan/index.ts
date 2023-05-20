import { siteRepo } from '../../../repos';
import { UpdateSiteController } from './UpdateSiteController';
import { UpdateSiteUseCase } from './UpdateSiteUseCase';

const updateSiteUseCase = new UpdateSiteUseCase(siteRepo);
const updateSiteController = new UpdateSiteController(updateSiteUseCase);

export { updateSiteUseCase, updateSiteController };