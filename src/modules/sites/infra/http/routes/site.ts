import express from 'express'
import { activateSiteController } from '../../../useCases/site/activateSite';
import { createSiteController } from '../../../useCases/site/createSite';
import { deleteSiteController } from '../../../useCases/site/deleteSite';
import { deactivateSiteController } from '../../../useCases/site/deactivateSite';
import { updateSiteController } from '../../../useCases/site/updateSite';
import { archiveSiteController } from '../../../useCases/site/archiveSite';

const siteRouter = express.Router();

siteRouter.get('/me',
  (req, res) => activateSiteController.execute(req, res)
)

siteRouter.get('/:username',
  (req, res) => deactivateSiteController.execute(req, res)
)
siteRouter.get('/me',
  (req, res) => deleteSiteController.execute(req, res)
)

siteRouter.get('/:username',
  (req, res) => updateSiteController.execute(req, res)
)
siteRouter.get('/me',
  (req, res) => createSiteController.execute(req, res)
)

siteRouter.get('/:username',
  (req, res) => archiveSiteController.execute(req, res)
)

export {
  siteRouter
}