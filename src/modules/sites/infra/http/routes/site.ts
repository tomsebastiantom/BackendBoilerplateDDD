import express from 'express'

import { createSiteController } from '../../../useCases/site/createSite';
import { deleteSiteController } from '../../../useCases/site/deleteSite';

import { updateSiteController } from '../../../useCases/site/updateSite';
import { getSiteByIdController } from '../../../useCases/site/getSiteById';

const siteRouter = express.Router();


siteRouter.delete('/:siteId',
  (req, res) => deleteSiteController.execute(req, res)
)

siteRouter.put('/:siteId',
  (req, res) => updateSiteController.execute(req, res)
)
siteRouter.post('/',
  (req, res) => createSiteController.execute(req, res)
)
siteRouter.get('/:siteId',
  (req, res) => getSiteByIdController.execute(req, res)
)
siteRouter.get('/:tenantId',
  (req, res) => getSiteByIdController.execute(req, res)
)



export {
  siteRouter
}