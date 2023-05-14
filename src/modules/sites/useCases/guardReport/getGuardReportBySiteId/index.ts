import { guardReportRepo } from '../../../repos';
import { GetGuardReportBySiteIdController } from './GetGuardReportBySiteIdController';
import { GetGuardReportBySiteIdUseCase } from './GetGuardReportBySiteIdUseCase';

const getGuardReportBySiteIdUseCase = new GetGuardReportBySiteIdUseCase(
  guardReportRepo
);
const getGuardReportBySiteIdController = new GetGuardReportBySiteIdController(
  getGuardReportBySiteIdUseCase
);

export { getGuardReportBySiteIdController, getGuardReportBySiteIdUseCase };
