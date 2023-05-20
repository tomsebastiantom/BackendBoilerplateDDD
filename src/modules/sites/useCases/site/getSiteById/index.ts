import { GetSiteByIdController } from "./GetSiteByIdController";
import { GetSiteByIdUseCase } from "./GetSiteByIdUseCase";
import { siteRepo } from "../../../repos";


const getSiteByIdUseCase = new GetSiteByIdUseCase(siteRepo);
const getSiteByIdController = new GetSiteByIdController(getSiteByIdUseCase);

export { getSiteByIdController,getSiteByIdUseCase };