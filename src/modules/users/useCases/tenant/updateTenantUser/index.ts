import { userRepo } from '../../../repos';
import { UpdateTenantUserController } from './UpdateTenantUserController';
import { UpdateTenantUserUseCase } from './UpdateTenantUserUseCase';

const updateTenantUserUseCase = new UpdateTenantUserUseCase(userRepo);
const updateTenantUserController = new UpdateTenantUserController(updateTenantUserUseCase);

export { updateTenantUserUseCase, updateTenantUserController };
