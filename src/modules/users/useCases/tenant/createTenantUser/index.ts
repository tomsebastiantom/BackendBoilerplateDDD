import { CreateTenantUserUseCase } from './CreateTenantUserUseCase';
import { CreateTenantUserController } from './CreateTenantUserController';
import { userRepo } from '../../../repos';

const createTenantUserUseCase = new CreateTenantUserUseCase(userRepo);
const createTenantUserController = new CreateTenantUserController(createTenantUserUseCase);

export { createTenantUserUseCase, createTenantUserController };
