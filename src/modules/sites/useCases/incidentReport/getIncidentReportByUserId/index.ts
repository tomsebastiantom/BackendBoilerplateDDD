import { GetIncidentReportByUserIdController } from './GetIncidentReportByUserIdController';
import { GetIncidentReportByUserIdUseCase } from './GetIncidentReportByUserIdUseCase';
import { incidentReportRepo } from '../../../repos';

const getIncidentReportByUserIdUseCase = new GetIncidentReportByUserIdUseCase(
  incidentReportRepo
);
const getIncidentReportByUserIdController = new GetIncidentReportByUserIdController(
  getIncidentReportByUserIdUseCase
);

export { getIncidentReportByUserIdUseCase, getIncidentReportByUserIdController };
