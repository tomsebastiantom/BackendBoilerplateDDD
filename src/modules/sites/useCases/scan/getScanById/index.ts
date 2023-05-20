import { scanRepo } from '../../../repos';
import { GetScanByIdController } from './GetScanByIdController';
import { GetScanByIdUseCase } from './GetScanByIdUseCase';

const getScanByIdUseCase = new GetScanByIdUseCase(scanRepo);
const getScanByIdController = new GetScanByIdController(getScanByIdUseCase);

export { getScanByIdUseCase, getScanByIdController };