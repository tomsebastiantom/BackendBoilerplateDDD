import { Entity } from '../../../shared/domain/Entity';
import { Result } from '../../../shared/core/Result';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Guard } from '../../../shared/core/Guard';
import { Address } from '../../../shared/nexa/address';

import { OrganizationId } from './organizationId';

interface OrganizationProps {
  organizationName: string;
  creationDate: Date;
  address: Address;
}

export class Organization extends Entity<OrganizationProps> {
  get organizationId(): OrganizationId {
    return OrganizationId.create(this._id).getValue();
  }
 

  private constructor(props: OrganizationProps, id?: UniqueEntityID) {
    super(props, id);
  }
  public static create(
    props: OrganizationProps,
    id?: UniqueEntityID
  ): Result<Organization> {
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      { argument: props.organizationName, argumentName: 'organizationName' }
    ]);
    //Todo Null Guard
    if (nullGuard.isFailure) {
      return Result.fail<Organization>(nullGuard.getErrorValue());
    } else {
      const organization = !!id === false;

      return Result.ok<Organization>(new Organization(props, id));
    }
  }
}
