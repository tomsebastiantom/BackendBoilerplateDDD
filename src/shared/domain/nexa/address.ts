import { UniqueEntityID } from '../UniqueEntityID';
import { Result } from '../../core/Result';
import { ValueObject } from '../ValueObject';
import { Guard } from '../../core/Guard';

export interface AddressProps {
  city: string;
  state: string;
  country?: string;
  postalCode: string;
}

export class Address extends ValueObject<AddressProps> {
  private constructor(props: AddressProps) {
    super(props);
  }

  get city(): string {
    return this.props.city;
  }

  get state(): string {
    return this.props.state;
  }

  get country(): string {
    return this.props.country;
  }

  get postalCode(): string {
    return this.props.postalCode;
  }
  public static toPersistence(address: Address): any {
    return {
      city: address.city,
      state: address.state,
      ...(address.country ? { country: address.country } : {}),
      postalCode: address.postalCode
    };
  }
  //Todo Address AutoComplete
  public static create(props: AddressProps): Result<Address> {
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      { argument: props.city, argumentName: 'city' },
      { argument: props.state, argumentName: 'state' },
      { argument: props.postalCode, argumentName: 'postalCode' }
    ]);

    if (nullGuard.isFailure) {
      return Result.fail<Address>(nullGuard.getErrorValue());
    } else {
      return Result.ok<Address>(new Address(props));
    }
  }
}
