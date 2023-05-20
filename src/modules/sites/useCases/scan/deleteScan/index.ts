import { scanRepo } from '../../../repos';
import { DeleteScanController } from './DeleteScanController';
import { DeleteScanUseCase } from './DeleteScanUseCase';

const deleteScanUseCase = new DeleteScanUseCase(scanRepo);
const deleteScanController = new DeleteScanController(deleteScanUseCase);

export { deleteScanUseCase, deleteScanController };