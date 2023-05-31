import { GetTenantByIdDTO } from './GetTenantByIdDTO';
import { GetTenantByIdErrors } from './GetTenantByIdErrors';
import { left, Result, Either, right } from '../../../../../shared/core/Result';
import { ITenantRepo } from '../../../repos/tenantRepo';
import { UseCase } from '../../../../../shared/core/UseCase';
import { AppError } from '../../../../../shared/core/AppError';
import { Tenant } from '../../../domain/tenant';

type Response = Either<AppError.UnexpectedError, Result<Tenant>>;

export class GetTenantByIdUseCase
  implements UseCase<GetTenantByIdDTO, Promise<Response>>
{
  private tenantRepo: ITenantRepo;

  constructor(tenantRepo: ITenantRepo) {
    this.tenantRepo = tenantRepo;
  }

  public async execute(request: GetTenantByIdDTO): Promise<Response> {
    try {
      const tenant = await this.tenantRepo.getTenantById(request.tenantId);
      if(!tenant){
        return left(new GetTenantByIdErrors.TenantNotFoundError(request.tenantId)) as Response
      }
      return right(Result.ok<Tenant>(tenant));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
