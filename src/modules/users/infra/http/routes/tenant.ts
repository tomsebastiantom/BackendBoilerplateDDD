import express from 'express';
import { createTenantController } from '../../../useCases/tenant/createTenant';
import { getTenantByIdController } from '../../../useCases/tenant/getTenant';
import { updateTenantController } from '../../../useCases/tenant/updateTenant';
import { deleteTenantByIdController } from '../../../useCases/tenant/deleteTenant';

const tenantRouter = express.Router();

tenantRouter.post('/', (req, res) => {
  createTenantController.execute(req, res);
  
});

tenantRouter.get('/:tenantId', (req, res) =>
  getTenantByIdController.execute(req, res)
);

tenantRouter.put('/:tenantId', (req, res) =>
  updateTenantController.execute(req, res)
);

tenantRouter.delete('/:tenantId', (req, res) =>
  deleteTenantByIdController.execute(req, res)
);

export { tenantRouter };
