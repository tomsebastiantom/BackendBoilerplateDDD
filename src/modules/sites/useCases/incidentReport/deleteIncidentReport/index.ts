import { DeleteIncidentReportController } from './DeleteIncidentReportController';
import { DeleteIncidentReportUseCase } from './DeleteIncidentReportUseCase';
import { siteRepo } from '../../../repos';

const deleteIncidentReportUseCase = new DeleteIncidentReportUseCase(siteRepo);
const deleteIncidentReportController = new DeleteIncidentReportController(
  deleteIncidentReportUseCase
);

export { deleteIncidentReportUseCase, deleteIncidentReportController };
