import { siteRepo } from '../../../repos';
import { DeleteSiteController } from './DeleteSiteController';
import { DeleteSiteUseCase } from './DeleteSiteUseCase';

const deleteSiteUseCase = new DeleteSiteUseCase(siteRepo);
const deleteSiteController = new DeleteSiteController(deleteSiteUseCase);

export { deleteSiteUseCase, deleteSiteController };