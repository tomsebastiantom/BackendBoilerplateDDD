import { tenantRepo } from '../../../repos';
import { UpdateTenantController } from './UpdateTenantController';
import { UpdateTenantUseCase } from './UpdateTenantUseCase';

const updateTenantUseCase = new UpdateTenantUseCase(tenantRepo);
const updateTenantController = new UpdateTenantController(updateTenantUseCase);

export { updateTenantUseCase, updateTenantController };
