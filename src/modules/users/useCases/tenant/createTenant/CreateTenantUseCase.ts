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
import { UserPassword } from '../../../domain/userPassword';
import { PrismaMigrationService } from '../../../../../shared/utils/DBUtils';
import { UniqueEntityID } from '../../../../../shared/domain/UniqueEntityID';
import { DomainEvents } from '../../../../../shared/domain/events/DomainEvents';

type Response = Either<
  CreateTenantErrors.TenantNameTakenError | AppError.UnexpectedError,
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
      const passwordOrError = UserPassword.create({ value: request.password });
      if (passwordOrError.isFailure) {
        return left(
          Result.fail<Tenant>(passwordOrError.getErrorValue().toString())
        ) as Response;
      }
      const passwordResult = await passwordOrError.getValue();
      const tenantOrError: Result<Tenant> = Tenant.create({
        name: request.name,
        companyName: request.companyName,
        email: request.email,
        password: passwordResult,
        username: request.username,
        phone: request.phone,
        ...(request.dbUrl ? { dbUrl: request.dbUrl } : {}),
        address: addressOrError.getValue()
      });

      if (tenantOrError.isFailure) {
        return left(
          Result.fail<Tenant>(tenantOrError.getErrorValue().toString())
        ) as Response;
      }
      const tenant: Tenant = tenantOrError.getValue();

      await this.tenantRepo.save(tenant);
      // Usage:

      if (request.dbUrl) {
        tenant.dbUrl = request.dbUrl;
       await this.authService.saveTenantDBUrl(
          tenant.tenantId.id.toString(),
          request.dbUrl
        );
      } else {
        await DatabaseService.createClientDatabase(
          tenantOrError.getValue().tenantId.id.toString()
        );
      }

      const prismaMigrationService = new PrismaMigrationService(
        tenantOrError.getValue().tenantId.id.toString()
      );
      try {
        await prismaMigrationService.updateSchemaAndMigrate(request?.dbUrl);
       
        console.log('Migration successful');
      } catch (error) {
        console.error('Migration failed', error);
      }
      DomainEvents.dispatchEventsForAggregate(
        new UniqueEntityID(tenantOrError.getValue().tenantId.id.toString())
      );

     

      return right(
        Result.ok<CreateTenantResponseDTO>({
          tenantId: tenant.tenantId.id.toString(),
          name: tenant.name
        })
      );
    } catch (err) {
      return left(new AppError.UnexpectedError(err)) as Response;
    }
  }
}
