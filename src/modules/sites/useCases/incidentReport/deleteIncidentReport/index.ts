import { DeleteIncidentReportController } from './DeleteIncidentReportController';
import { DeleteIncidentReportUseCase } from './DeleteIncidentReportUseCase';
import { incidentReportRepo } from '../../../repos';

const deleteIncidentReportUseCase = new DeleteIncidentReportUseCase(incidentReportRepo);
const deleteIncidentReportController = new DeleteIncidentReportController(
  deleteIncidentReportUseCase
);

export { deleteIncidentReportUseCase, deleteIncidentReportController };
