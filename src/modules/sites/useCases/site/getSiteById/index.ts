import { CreateSiteController } from "./GetSiteByIdController";
import { CreateSiteUseCase } from "./GetSiteByIdUseCase";
import { siteRepo } from "../../../repos";


const createSiteUseCase = new CreateSiteUseCase(siteRepo);
const createSiteController = new CreateSiteController(createSiteUseCase);

export { createSiteUseCase, createSiteController };