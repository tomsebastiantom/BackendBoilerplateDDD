import { Result } from '../../../shared/core/Result';
import { Entity } from '../../../shared/domain/Entity';
import { Guard } from '../../../shared/core/Guard';

export interface AddressProps {
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export class Address extends Entity<any> {
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
//Todo Address validation
  public static create(props: AddressProps): Result<Address> {
    // Add any necessary validation logic here, and return an error if validation fails
    return Result.ok<Address>(new Address(props));
  }
}
