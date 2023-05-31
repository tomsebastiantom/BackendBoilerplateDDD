import { GetTenantByIdUseCase } from './GetTenantByIdUseCase';
import { GetTenantByIdController } from './GetTenantByIdController';
import { tenantRepo } from '../../../repos';

const getTenantByIdUseCase = new GetTenantByIdUseCase(tenantRepo);

const getTenantByIdController = new GetTenantByIdController(
  getTenantByIdUseCase
);

export { getTenantByIdUseCase, getTenantByIdController };
