import { ActivateSiteController } from "./ActivateSiteController";
import { ActivateSiteUseCase } from "./ActivateSiteUseCase";
import { siteRepo } from "../../../repos";


const activateSiteUseCase = new ActivateSiteUseCase(siteRepo);
const activateSiteController = new ActivateSiteController(activateSiteUseCase);

export { activateSiteUseCase, activateSiteController };