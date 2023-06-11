import { CreateTenantUseCase } from './CreateTenantUseCase';
import { CreateTenantController } from './CreateTenantController';
import { tenantRepo } from '../../../repos';
import { authService } from '../../../services';

const createTenantUseCase = new CreateTenantUseCase(tenantRepo,authService);

const createTenantController = new CreateTenantController(createTenantUseCase);

export { createTenantUseCase, createTenantController };
