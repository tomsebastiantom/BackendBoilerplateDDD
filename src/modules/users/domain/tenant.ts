import { Entity } from '../../../shared/domain/Entity';
import { Result } from '../../../shared/core/Result';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Guard } from '../../../shared/core/Guard';
import { Address } from '../../../shared/nexa/address';

import { TenantId } from './tenantId';

interface TenantProps {
  TenantName: string;
  creationDate: Date;
  address: Address;
}

export class Tenant extends Entity<TenantProps> {
  get TenantId(): TenantId {
    return TenantId.create(this._id).getValue();
  }

  private constructor(props: TenantProps, id?: UniqueEntityID) {
    super(props, id);
  }
  public static create(
    props: TenantProps,
    id?: UniqueEntityID
  ): Result<Tenant> {
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      { argument: props.TenantName, argumentName: 'TenantName' }
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
