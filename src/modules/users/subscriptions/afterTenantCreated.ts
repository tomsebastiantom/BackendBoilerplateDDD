import { IHandle } from '../../../shared/domain/events/IHandle';
import { DomainEvents } from '../../../shared/domain/events/DomainEvents';
import { TenantCreated } from '../domain/events/tenantCreated';
import { createUserUseCase } from '../useCases/user/createUser';
import { CreateUserDTO } from '../useCases/user/createUser/CreateUserDTO';

export class AfterTenantCreated implements IHandle<TenantCreated> {
  private createUser: typeof createUserUseCase;

  constructor(createUser: typeof createUserUseCase) {
    this.setupSubscriptions();
    // console.log(`[AfterTenantCreated]: Subscribed to Domain Event`);
    this.createUser = createUser;
  }

  setupSubscriptions(): void {
    // Register to the domain event
    // console.log(`[AfterTenantCreated]: Subscribing to Domain Event`);
    DomainEvents.register(this.onTenantCreated.bind(this), TenantCreated.name);
  }

  private async onTenantCreated(event: TenantCreated): Promise<void> {
    try {
      let user: CreateUserDTO = {
        name: event.tenant.name,
        email: event.tenant.email,
        password: event.tenant.password,
        username: event.tenant.username,
        phone: event.tenant.phone,
        tenantId: event.tenant.TenantId.id.toString(),
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

      await this.createUser.execute({ ...user });
    //   console.log(`[AfterTenantCreated]: Added Tenant as admin`);
    } catch (err) {
      console.log(`[AfterTenantCreated]: Added Tenant as admin Error`);
    }
  }
}
