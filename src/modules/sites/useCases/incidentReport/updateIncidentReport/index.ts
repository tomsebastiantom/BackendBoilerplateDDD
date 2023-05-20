import { incidentReportRepo } from '../../../repos';
import { UpdateIncidentReportController } from './UpdateIncidentReportController';
import { UpdateIncidentReportUseCase } from './UpdateIncidentReportUseCase';

const updateIncidentReportUseCase = new UpdateIncidentReportUseCase(incidentReportRepo);
const updateIncidentReportController = new UpdateIncidentReportController(
  updateIncidentReportUseCase
);

export { updateIncidentReportUseCase, updateIncidentReportController };
