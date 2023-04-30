import { Entity } from '../../../shared/domain/Entity';
import { Result } from '../../../shared/core/Result';
import { Guard } from '../../../shared/core/Guard';

import { ContactAdded } from './events/contactAdded';

interface ContactProps {
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  contactRole: string;
}

export class Contact extends Entity<ContactProps> {
  public constructor(props: ContactProps) {
    super(props);
  }
  public create(props: ContactProps): Result<Contact> {
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      { argument: props.contactName, argumentName: 'contactName' }
    ]);

    if (nullGuard.isFailure) {
      return Result.fail<Contact>(nullGuard.getErrorValue());
    } else {
      const contact = new Contact({ ...props });

      return Result.ok<Contact>(new Contact(props));
    }
  }
}
