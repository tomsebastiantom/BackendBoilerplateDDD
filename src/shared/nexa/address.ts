
import { UniqueEntityID } from "../domain/UniqueEntityID";
import { Result } from "../core/Result";
import { ValueObject } from "../domain/ValueObject";
import { Guard } from "../core/Guard";

export interface AddressProps {
  city: string;
  state: string;
  country?: string;
  postalCode: string;
}

export class Address extends ValueObject<any> {
  private constructor(props: AddressProps) {
    super(props);
  }

  get city(): string {
    return this.city;
  }

  get state(): string {
    return this.state;
  }

  get country(): string {
    return this.country;
  }

  get postalCode(): string {
    return this.postalCode;
  }
  //Todo Address AutoComplete
  public static create(props: AddressProps): Result<Address> {
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      { argument: props.city, argumentName: 'city' },
      { argument: props.state, argumentName: 'state' },
      { argument: props.postalCode, argumentName: 'postalCode' },
      { argument: props.country, argumentName: 'country' }
    ]);

    if (nullGuard.isFailure) {
      return Result.fail<Address>(nullGuard.getErrorValue());
    } else {
      return Result.ok<Address>(new Address(props));
    }
  }
}
