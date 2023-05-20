import { checkpointRepo, scanRepo } from '../../../repos';
import { CreateScanController } from './CreateScanController';
import { CreateScanUseCase } from './CreateScanUseCase';

const createScanUseCase = new CreateScanUseCase(scanRepo,checkpointRepo);
const createScanController = new CreateScanController(createScanUseCase);

export { createScanUseCase, createScanController };