import { Either, Result } from '../../../../../shared/core/Result';
import { CreateTenantErrors } from './CreateTenantErrors';
import { AppError } from '../../../../../shared/core/AppError';
import { CreateTenantResponseDTO } from './CreateTenantDTO';

export type CreateTenantResponse = Either<
  | CreateTenantErrors.TenantNameTakenError
  | AppError.UnexpectedError
  | Result<any>,
  Result<CreateTenantResponseDTO>
>;
