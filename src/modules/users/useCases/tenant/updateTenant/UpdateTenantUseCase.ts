import { AppError } from '../../../../../shared/core/AppError';
import { Either, left, Result, right } from '../../../../../shared/core/Result';
import { UseCase } from '../../../../../shared/core/UseCase';
import { UpdateTenantDTO } from './UpdateTenantDTO';
import { UpdateTenantErrors } from './UpdateTenantErrors';
import { UpdateTenantResponse } from './UpdateTenantResponse';
import { ITenantRepo } from '../../../repos/tenantRepo';
import { Tenant } from '../../../domain/tenant';
import { Address } from '../../../../../shared/domain/nexa/address';

export class UpdateTenantUseCase
  implements UseCase<UpdateTenantDTO, Promise<UpdateTenantResponse>>
{
  private tenantRepo: ITenantRepo;

  constructor(tenantRepo: ITenantRepo) {
    this.tenantRepo = tenantRepo;
  }
  async execute(request: UpdateTenantDTO): Promise<UpdateTenantResponse> {
    try {
      const tenant = await this.tenantRepo.getTenantById(request.tenantId);

      if (!tenant) {
        return left(
          new UpdateTenantErrors.TenantIdNotFoundError(
            request.tenantId as string
          )
        ) as UpdateTenantResponse;
      }

      const newtenant: any = {
        name: tenant.name,
        dbUrl: tenant.dbUrl,
        address: tenant.address
      };
      if (request.name) {
        newtenant.name = request.name;
      }
      if (request.dbUrl) {
        newtenant.dbUrl = request.dbUrl;
      }
      if (request.address) {
        newtenant.address = Address.create(request.address).getValue();
      }

      const tenantOrError = Tenant.create(newtenant, tenant.tenantId.id);

      if (tenantOrError.isFailure) {
        return left(
          Result.fail<Tenant>(tenantOrError.getErrorValue().toString())
        ) as UpdateTenantResponse;
      }

      const updatedTenant: Tenant = tenantOrError.getValue();

      await this.tenantRepo.update(request.tenantId, updatedTenant);

      return right(Result.ok<Tenant>(updatedTenant));
    } catch (err) {
      return left(new AppError.UnexpectedError(err)) as UpdateTenantResponse;
    }
  }
}
