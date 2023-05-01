import { CreateSiteController } from "./CreateSiteController";
import { CreateSiteUseCase } from "./CreateSiteUseCase";
import { siteRepo } from "../../../repos";


const createSiteUseCase = new CreateSiteUseCase(siteRepo);
const createSiteController = new CreateSiteController(createSiteUseCase);

export { createSiteUseCase, createSiteController };