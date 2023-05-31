import { Entity } from '../../../shared/domain/Entity';
import { Result } from '../../../shared/core/Result';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Guard } from '../../../shared/core/Guard';
import { Address } from '../../../shared/domain/nexa/address';

import { TenantId } from './tenantId';

interface TenantProps {
  name: string;
  address: Address;
  dbUrl?: string;
}

export class Tenant extends Entity<TenantProps> {
  get TenantId(): TenantId {
    return TenantId.create(this._id).getValue();
  }
  get name(): string {
    return this.props.name;
  }
  get address(): Address {
    return this.props.address;
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
      { argument: props.name, argumentName: 'name' }
    ]);
    //Todo Null Guard
    if (nullGuard.isFailure) {
      return Result.fail<Tenant>(nullGuard.getErrorValue());
    } else {
      const tenant = !!id === false;

      return Result.ok<Tenant>(new Tenant(props, id));
    }
  }
}
