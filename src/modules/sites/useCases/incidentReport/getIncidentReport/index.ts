import { GetIncidentReportController } from './GetIncidentReportController';
import { GetIncidentReportUseCase } from './GetIncidentReportUseCase';
import { siteRepo } from '../../../repos';

const getIncidentReportUseCase = new GetIncidentReportUseCase(siteRepo);
const getIncidentReportController = new GetIncidentReportController(
 getIncidentReportUseCase
);

export { getIncidentReportUseCase,getIncidentReportController };
