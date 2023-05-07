import { UpdateSiteController } from "./UpdateSiteController";
import { UpdateSiteUseCase } from "./UpdateSiteUseCase";
import { siteRepo } from "../../../repos";


const updateSiteUseCase = new UpdateSiteUseCase(siteRepo);
const updateSiteController = new UpdateSiteController(updateSiteUseCase);

export { updateSiteUseCase, updateSiteController };