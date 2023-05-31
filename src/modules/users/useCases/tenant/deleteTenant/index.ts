import { DeleteTenantByIdUseCase } from './DeleteTenantByIdUseCase';
import { DeleteTenantByIdController } from './DeleteTenantByIdController';
import { tenantRepo } from '../../../repos';

const deleteTenantByIdUseCase = new DeleteTenantByIdUseCase(tenantRepo);

const deleteTenantByIdController = new DeleteTenantByIdController(
  deleteTenantByIdUseCase
);

export { deleteTenantByIdUseCase, deleteTenantByIdController };
