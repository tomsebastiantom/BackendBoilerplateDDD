import express from 'express';
import { userRouter } from '../../../../modules/users/infra/http/routes';
import { checkpointRouter, guardReportRouter, incidentReportRouter, scanRouter, siteRouter } from '../../../../modules/sites/infra/http/routes';

const v1Router = express.Router();

v1Router.get('/', (req, res) => {
  return res.json({ message: "Yo! we're up" });
});

v1Router.use('/users', userRouter);
v1Router.use('/sites', siteRouter);
v1Router.use('/checkpoints', checkpointRouter);
v1Router.use('/scans', scanRouter);
v1Router.use('/incidentreports', incidentReportRouter);
v1Router.use('/guardreports', guardReportRouter);

export { v1Router };
