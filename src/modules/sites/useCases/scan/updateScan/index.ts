import { scanRepo,checkpointRepo } from '../../../repos';
import { UpdateScanController } from './UpdateScanController';
import { UpdateScanUseCase } from './UpdateScanUseCase';

const updateScanUseCase = new UpdateScanUseCase(scanRepo,checkpointRepo);
const updateScanController = new UpdateScanController(updateScanUseCase);

export { updateScanUseCase, updateScanController };