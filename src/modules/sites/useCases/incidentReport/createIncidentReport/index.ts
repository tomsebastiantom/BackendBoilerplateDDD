import { CreateIncidentReportController } from './CreateIncidentReportController';
import { CreateIncidentReportUseCase } from './CreateIncidentReportUseCase';
import { siteRepo } from '../../../repos';

const createIncidentReportUseCase = new CreateIncidentReportUseCase(siteRepo);
const createIncidentReportController = new CreateIncidentReportController(
  createIncidentReportUseCase
);

export { createIncidentReportUseCase, createIncidentReportController };
