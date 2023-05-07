import { DeactivateSiteController } from "./DeactivateSiteController";
import { DeactivateSiteUseCase } from "./DeactivateSiteUseCase";
import { siteRepo } from "../../../repos";


const deactivateSiteUseCase = new DeactivateSiteUseCase(siteRepo);
const deactivateSiteController = new DeactivateSiteController(deactivateSiteUseCase);

export { deactivateSiteUseCase, deactivateSiteController };