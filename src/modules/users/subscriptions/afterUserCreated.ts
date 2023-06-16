import { IHandle } from '../../../shared/domain/events/IHandle';
import { DomainEvents } from '../../../shared/domain/events/DomainEvents';
import { TenantCreated } from '../domain/events/tenantCreated';
import { CreateUserDTO } from '../useCases/user/createUser/CreateUserDTO';

import { UserCreated } from '../domain/events/userCreated';

export class AfterUserCreated implements IHandle<TenantCreated> {
  private createUser

  constructor(createTenantUserUseCase) {
    this.setupSubscriptions();
    // console.log(`[AfterTenantCreated]: Subscribed to Domain Event`);
    this.createUser = createTenantUserUseCase
  }

  setupSubscriptions(): void {
    // Register to the domain event
    // console.log(`[AfterTenantCreated]: Subscribing to Domain Event`);
    DomainEvents.register(this.onUserCreated.bind(this), UserCreated.name);
  }

  private async onUserCreated(event: UserCreated): Promise<void> {
    //using tenant id and connecting to tenant db and then putting user
    // const prismaUserRepo = new PrismaUserRepo(
    //   await databaseService.getDBclient(event.user.tenantId.id.toString())
    // );
    // const createUserUseCase = new CreateUserUseCase(prismaUserRepo);

    try {

      // export interface CreateTenantUserDTO {
      //   username: string;
      //   email: string;
      //   phone: string;
      //   password: string;
      //   name:string;
      //   tenantId: string;
      //   isAdminUser?: boolean;
      // }
      
      
      let user: CreateUserDTO = {
        name: event.user.name,
        email: event.user.email.value,
        password: event.user.password.getValue(),
        username: event.user.username.value,
        phone: event.user.phone,
        tenantId: event.user.tenantId.id.toString(),
        isAdminUser: true
      };
      await this.createUser.execute({ ...user });
      //   try {
   
      
      //   console.log(`[AfterTenantCreated]: Added Tenant as admin`);
    } catch (err) {
      console.log(`[AfterTenantCreated]: Added Tenant as admin Error`);
    }
  }
}
