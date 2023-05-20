import express from 'express'

import { createIncidentReportController } from '../../../useCases/incidentReport/createIncidentReport';
import { deleteIncidentReportController } from '../../../useCases/incidentReport/deleteIncidentReport';
import { getIncidentReportBySiteIdController } from '../../../useCases/incidentReport/getIncidentReportBySideId';
import { getIncidentReportByIdController } from '../../../useCases/incidentReport/getIncidentByIdReport';
import { updateIncidentReportController } from '../../../useCases/incidentReport/updateIncidentReport';
import { getIncidentReportByUserIdController } from '../../../useCases/incidentReport/getIncidentReportByUserId';

const incidentReportRouter = express.Router();


incidentReportRouter.post('/',
  (req, res) => createIncidentReportController.execute(req, res)
)
incidentReportRouter.delete('/:incidentReportId',
  (req, res) => deleteIncidentReportController.execute(req, res)
)
incidentReportRouter.put('/:incidentReportId',
  (req, res) => updateIncidentReportController.execute(req, res)
)
incidentReportRouter.get('/:siteId',
  (req, res) => getIncidentReportBySiteIdController.execute(req, res)
)
incidentReportRouter.get('/:incidentReportId',
  (req, res) => getIncidentReportByIdController.execute(req, res)
)
incidentReportRouter.get('/:userId',
  (req, res) => getIncidentReportByUserIdController.execute(req, res)
)

export {
  incidentReportRouter
}