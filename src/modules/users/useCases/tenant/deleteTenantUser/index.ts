import { DeleteTenantUserUseCase } from './DeleteTenantUserUseCase';
import { DeleteTenantUserController } from './DeleteTenantUserController';
import { userRepo } from '../../../repos';

const deleteTenantUserUseCase = new DeleteTenantUserUseCase(userRepo);
const deleteTenantUserController = new DeleteTenantUserController(deleteTenantUserUseCase);

export { deleteTenantUserUseCase, deleteTenantUserController };
