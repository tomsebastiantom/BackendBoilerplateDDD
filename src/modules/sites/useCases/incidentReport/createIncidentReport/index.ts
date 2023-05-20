import { CreateIncidentReportController } from './CreateIncidentReportController';
import { CreateIncidentReportUseCase } from './CreateIncidentReportUseCase';
import { incidentReportRepo } from '../../../repos';

const createIncidentReportUseCase = new CreateIncidentReportUseCase(incidentReportRepo);
const createIncidentReportController = new CreateIncidentReportController(
  createIncidentReportUseCase
);

export { createIncidentReportUseCase, createIncidentReportController };
