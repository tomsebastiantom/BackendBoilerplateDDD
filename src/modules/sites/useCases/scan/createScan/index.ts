import { checkpointRepo, scanRepo } from '../../../repos';
import { CreateScanController } from './CreateScanController';
import { CreateScanUseCase } from './CreateScanUseCase';

const createSiteUseCase = new CreateScanUseCase(scanRepo,checkpointRepo);
const createSiteController = new CreateScanController(createSiteUseCase);

export { createSiteUseCase, createSiteController };