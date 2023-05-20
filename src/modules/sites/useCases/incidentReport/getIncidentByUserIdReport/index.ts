import { GetIncidentReportByIdController } from './GetIncidentReportByIdController';
import { GetIncidentReportByIdUseCase } from './GetIncidentReportByIdUseCase';
import { incidentReportRepo } from '../../../repos';

const getIncidentReportByIdUseCase = new GetIncidentReportByIdUseCase(
  incidentReportRepo
);
const getIncidentReportByIdController = new GetIncidentReportByIdController(
  getIncidentReportByIdUseCase
);

export { getIncidentReportByIdUseCase, getIncidentReportByIdController };
