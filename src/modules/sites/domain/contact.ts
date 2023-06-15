import { Result } from '../../../shared/core/Result';
import { Guard } from '../../../shared/core/Guard';

import { ContactAdded } from './events/contactAdded';
import { ValueObject } from '../../../shared/domain/ValueObject';

interface ContactProps {
  contactName: string;
  contactPhone?: string;
  contactEmail: string;
  contactRole: string;
}

export class Contact extends ValueObject<ContactProps> {
  get contactName(): string {
    return this.props.contactName;
  }
  get contactPhone(): string {
    return this.props.contactPhone;
  }
  get contactEmail(): string {
    return this.props.contactEmail;
  }
  get contactRole(): string {
    return this.props.contactRole;
  }
  public constructor(props: ContactProps) {
    super(props);
  }
  public static toPersistence(contact: Contact): any {
    return {
      contactName: contact.contactName,
      ...(contact.contactPhone ? { contactPhone: contact.contactPhone } : {}),
      contactEmail: contact.contactEmail,
      contactRole: contact.contactRole
    };
  }
  public static create(props: ContactProps): Result<Contact> {
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      { argument: props.contactName, argumentName: 'contactName' },
      { argument: props.contactEmail, argumentName: 'contactEmail' }
    ]);

    if (nullGuard.isFailure) {
      return Result.fail<Contact>(nullGuard.getErrorValue());
    } else {
      return Result.ok<Contact>(new Contact(props));
    }
  }
}
