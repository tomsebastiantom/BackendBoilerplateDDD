import { guardReportRepo } from '../../../repos';
import { GetGuardReportByUserIdController } from './GetGuardReportByUserIdController';
import { GetGuardReportByUserIdUseCase } from './GetGuardReportByUserIdUseCase';

const getGuardReportByUserIdUseCase = new GetGuardReportByUserIdUseCase(
  guardReportRepo
);
const getGuardReportByUserIdController = new GetGuardReportByUserIdController(
  getGuardReportByUserIdUseCase
);

export { getGuardReportByUserIdController, getGuardReportByUserIdUseCase };
