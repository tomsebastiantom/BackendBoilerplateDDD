import { DeleteTenantByIdDTO } from './DeleteTenantByIdDTO';

import { left, Result, Either, right } from '../../../../../shared/core/Result';
import { ITenantRepo } from '../../../repos/tenantRepo';
import { UseCase } from '../../../../../shared/core/UseCase';
import { AppError } from '../../../../../shared/core/AppError';

type Response = Either<AppError.UnexpectedError, Result<void>>;

export class DeleteTenantByIdUseCase
  implements UseCase<DeleteTenantByIdDTO, Promise<Response>>
{
  private tenantRepo: ITenantRepo;

  constructor(tenantRepo: ITenantRepo) {
    this.tenantRepo = tenantRepo;
  }

  public async execute(request: DeleteTenantByIdDTO): Promise<Response> {
    try {
      await this.tenantRepo.delete(request.tenantId);

      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
