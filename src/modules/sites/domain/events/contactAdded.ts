import { IDomainEvent } from '../../../../shared/domain/events/IDomainEvent';
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';

import { Contact } from '../contact';
import { Site } from '../site';

export class ContactAdded implements IDomainEvent {
  public dateTimeOccurred: Date;
  public site: Site;
  public contact: Contact;

  constructor(site: Site, contact: Contact) {
    this.dateTimeOccurred = new Date();
    this.site = site;
    this.contact = contact;
  }

  getAggregateId(): UniqueEntityID {
    return this.site.id;
  }
}
