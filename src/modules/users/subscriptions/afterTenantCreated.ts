import { IHandle } from '../../../shared/domain/events/IHandle';
import { DomainEvents } from '../../../shared/domain/events/DomainEvents';
import { TenantCreated } from '../domain/events/tenantCreated';
import { createUserUseCase } from '../useCases/user/createUser';

export class AfterTenantCreated implements IHandle<TenantCreated> {
  private createUser: typeof createUserUseCase;

  constructor(createUser:typeof createUserUseCase) {
    this.setupSubscriptions();
    this.createUser = createUser;
  }

  setupSubscriptions(): void {
    // Register to the domain event
    DomainEvents.register(this.onTenantCreated.bind(this), TenantCreated.name);
  }

  private async onTenantCreated(event: TenantCreated): Promise<void> {
    try {
      await this.createUser.execute(
        {name : event.tenant.name,
        email: event.tenant.email,
        password: event.tenant.password,
        username: event.tenant.username,
        phone: event.tenant.phone,
        tenantId: event.tenant.TenantId.id.toString()

      }

    //   username: string;
    //   email: string;
    //   phone: string;
    //   password: string;
    //   name:string;
    //   tenantId: string;
    //   isAdminUser?: boolean;
    //   Address?: AddressDTO;
      );
      console.log(
        `[AfterCommentPosted]: Updated post stats for {${event.tenant.name}}`
      );
    } catch (err) {
      console.log(
        `[AfterCommentPosted]: Failed to update post stats for {${event.tenant.name}}`
      );
    }
  }
}
