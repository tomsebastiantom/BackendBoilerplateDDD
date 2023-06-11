import { CreateTenantDTO } from './CreateTenantDTO';
import { CreateTenantErrors } from './CreateTenantErrors';
import { Either, Result, left, right } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { ITenantRepo } from '../../../repos/tenantRepo';
import { UseCase } from '../../../../../shared/core/UseCase';
import { Address } from '../../../../../shared/domain/nexa/address';
import { Tenant } from '../../../domain/tenant';
import { DatabaseService } from '../../../../../shared/services/DatabaseService';
import { IAuthService } from '../../../services/authService';
import { CreateTenantResponseDTO } from './CreateTenantDTO';

type Response = Either<
  | CreateTenantErrors.TenantNameTakenError
  | AppError.UnexpectedError,
  Result<CreateTenantResponseDTO>
>;

export class CreateTenantUseCase
  implements UseCase<CreateTenantDTO, Promise<Response>>
{
  private tenantRepo: ITenantRepo;
  private authService: IAuthService;
  constructor(tenantRepo: ITenantRepo, authService: IAuthService) {
    this.tenantRepo = tenantRepo;
    this.authService = authService;
  }

  async execute(request: CreateTenantDTO): Promise<Response> {
    try {
      const tenantAlreadyExists = await this.tenantRepo.exists(request.name);

      if (tenantAlreadyExists) {
        return left(
          new CreateTenantErrors.TenantNameTakenError(request.name)
        ) as Response;
      }

      const addressOrError = Address.create(request.address);

      if (addressOrError.isFailure) {
        return left(
          Result.fail<Tenant>(addressOrError.getErrorValue().toString())
        ) as Response;
      }
      const tenantOrError: Result<Tenant> = Tenant.create({
        name: request.name,
        address: addressOrError.getValue()
      });

      if (tenantOrError.isFailure) {
        return left(
          Result.fail<Tenant>(tenantOrError.getErrorValue().toString())
        ) as Response;
      }
      const tenant: Tenant = tenantOrError.getValue();

      if (request.dbUrl) {
        tenant.dbUrl = request.dbUrl;
        this.authService.saveTenantDBUrl(
          tenant.TenantId.id.toString(),
          request.dbUrl
        );
      } else {
        await DatabaseService.createClientDatabase(
          tenantOrError.getValue().TenantId.id.toString()
        );
      }
      await this.tenantRepo.save(tenant);

      return right(Result.ok<CreateTenantResponseDTO>({
        tenantId: tenant.TenantId.id.toString(),
        name: tenant.name,
      }));
    } catch (err) {
      return left(new AppError.UnexpectedError(err)) as Response;
    }
  }
}
