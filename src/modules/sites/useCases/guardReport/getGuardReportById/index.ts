import { guardReportRepo } from '../../../repos';
import { GetGuardReportByIdController } from './GetGuardReportByIdController';
import { GetGuardReportByIdUseCase } from './GetGuardReportByIdUseCase';

const getGuardReportByIdUseCase = new GetGuardReportByIdUseCase(guardReportRepo);
const getGuardReportByIdController = new GetGuardReportByIdController(
  getGuardReportByIdUseCase
);

export { getGuardReportByIdController, getGuardReportByIdUseCase };
