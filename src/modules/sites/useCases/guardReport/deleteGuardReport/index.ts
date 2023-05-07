import { DeleteSiteController } from "./DeleteSiteController";
import { DeleteSiteUseCase } from "./DeleteSiteUseCase";
import { siteRepo } from "../../../repos";


const deleteSiteUseCase = new DeleteSiteUseCase(siteRepo);
const deleteSiteController = new DeleteSiteController(deleteSiteUseCase);

export { deleteSiteUseCase, deleteSiteController };