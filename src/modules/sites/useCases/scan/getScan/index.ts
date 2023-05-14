import { ArchiveSiteController } from "./ArchiveSiteController";
import { ArchiveSiteUseCase } from "./ArchiveSiteUseCase";
import { siteRepo } from "../../../repos";


const archiveSiteUseCase = new ArchiveSiteUseCase(siteRepo);
const archiveSiteController = new ArchiveSiteController(archiveSiteUseCase);

export { archiveSiteUseCase, archiveSiteController };