import { IHandle } from '../../../shared/domain/events/IHandle';
import { DomainEvents } from '../../../shared/domain/events/DomainEvents';
import { TenantCreated } from '../domain/events/tenantCreated';
import { CreateUserDTO } from '../useCases/user/createUser/CreateUserDTO';
import { databaseService } from '../../../shared/services';
import { PrismaUserRepo } from '../repos/implementations/prismaUserRepo';
import { CreateUserUseCase } from '../useCases/user/createUser/CreateUserUseCase';

export class AfterTenantCreated implements IHandle<TenantCreated> {
  // private createUser: typeof createUserUseCase;

  constructor() {
    this.setupSubscriptions();
    // console.log(`[AfterTenantCreated]: Subscribed to Domain Event`);
    // this.createUser = createUser;
  }

  setupSubscriptions(): void {
    // Register to the domain event
    // console.log(`[AfterTenantCreated]: Subscribing to Domain Event`);
    DomainEvents.register(this.onTenantCreated.bind(this), TenantCreated.name);
  }

  private async onTenantCreated(event: TenantCreated): Promise<void> {
    //using tenat id and conencting to tenat db and then puttin user
    const prismaUserRepo = new PrismaUserRepo(
      await databaseService.getDBclient(event.tenant.tenantId.id.toString())
    );
    const createUserUseCase = new CreateUserUseCase(prismaUserRepo);

    try {
      let user: CreateUserDTO = {
        name: event.tenant.name,
        email: event.tenant.email,
        password: event.tenant.password.getValue(),
        username: event.tenant.username,
        phone: event.tenant.phone,
        tenantId: event.tenant.tenantId.id.toString(),
        isAdminUser: true
      };
      //   try {
      if (event.tenant.address) {
        //   console.log(
        //     `[AfterTenantCreated]: Adding Tenant as admin`,
        //     event.tenant.address
        //   );
        user.address = {
          city: event.tenant.address.city,
          state: event.tenant.address.state,
          postalCode: event.tenant.address.postalCode,
          ...(event.tenant.address.country
            ? { country: event.tenant.address.country }
            : {})
        };
      }
      //   } catch (err) {
      //     console.log(`[AfterTenantCreated]: Adding Tenant as admin Error`, err);
      //   }

      await createUserUseCase.execute({ ...user });
      //   console.log(`[AfterTenantCreated]: Added Tenant as admin`);
    } catch (err) {
      console.log(`[AfterTenantCreated]: Added Tenant as admin Error`);
    }
  }
}
