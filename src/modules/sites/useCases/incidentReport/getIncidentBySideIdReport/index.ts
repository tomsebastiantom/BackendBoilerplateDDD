import { GetIncidentReportBySiteIdController } from './GetIncidentReportBySiteIdController';
import { GetIncidentReportBySiteIdUseCase } from './GetIncidentReportBySiteIdUseCase';
import { incidentReportRepo } from '../../../repos';

const getIncidentReportBySiteIdUseCase = new GetIncidentReportBySiteIdUseCase(
  incidentReportRepo
);
const getIncidentReportBySiteIdController = new GetIncidentReportBySiteIdController(
  getIncidentReportBySiteIdUseCase
);

export { getIncidentReportBySiteIdUseCase, getIncidentReportBySiteIdController };
