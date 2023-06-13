import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { Result } from '../../../shared/core/Result';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Guard } from '../../../shared/core/Guard';
import { Address } from '../../../shared/domain/nexa/address';
import { TenantCreated } from './events/tenantCreated';
import { TenantId } from './tenantId';
import { UserPassword } from './userPassword';

interface TenantProps {
  companyName: string;
  address: Address;
  dbUrl?: string;
  email: string;
  password: UserPassword;
  phone?: string;
  name: string;
  username: string;
}

export class Tenant extends AggregateRoot<TenantProps> {
  get tenantId(): TenantId {
    return TenantId.create(this._id).getValue();
  }
  // get userId(): UserId {
  //   return UserId.create(this._id).getValue();
  // }
  get name(): string {
    return this.props.name;
  }
  get address(): Address {
    return this.props.address;
  }
  get companyName(): string {
    return this.props.companyName;
  }
  get email(): string {
    return this.props.email;
  }
  set email(email: string) {
    this.props.email = email;
  }
  
  get password(): UserPassword {
    return this.props.password;
  }
  get phone(): string {
    return this.props.phone;
  }
  get username(): string {
    return this.props.username;
  }
  get dbUrl(): string {
    return this.props.dbUrl;
  }
  set dbUrl(dbUrl: string) {
    this.props.dbUrl = dbUrl;
  }
  private constructor(props: TenantProps, id?: UniqueEntityID) {
    super(props, id);
  }
  public static create(
    props: TenantProps,
    id?: UniqueEntityID
  ): Result<Tenant> {
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      { argument: props.name, argumentName: 'name' },
      { argument: props.name, argumentName: 'companyName' }
    ]);
    //Todo Null Guard
    if (nullGuard.isFailure) {
      return Result.fail<Tenant>(nullGuard.getErrorValue());
    } else {
      const tenant = new Tenant(props, id);
      const newtenant = !!id === false;
      if (newtenant) {
        tenant.addDomainEvent(new TenantCreated(tenant));
        // console.log(`[TenantCreated]: ${tenant.name}`,tenant);
      }
      return Result.ok<Tenant>(tenant);
    }
  }
}
