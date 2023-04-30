import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Result } from '../../../shared/core/Result';
import { Guard } from '../../../shared/core/Guard';

import { SiteId } from './siteId';
import { SiteCreated } from './events/siteCreated';
import { Contact } from './contact';
import { Address } from './address';
import { Instruction } from './instruction';

interface SiteName {
  siteName: string;
}

export interface SiteProps {
  siteId: SiteId;
  siteName: SiteName;
  address: Address;
  companyName: string;
  contacts: [Contact];
  isActive: boolean;
  instructions: [Instruction];
  siteCreationDate: Date;
  siteLastUpdatedDate: Date;
}

export class Site extends AggregateRoot<SiteProps> {
  get siteId(): SiteId {
    return this.siteId;
  }

  get siteName(): SiteName {
    return this.siteName;
  }

  get address(): Address {
    return this.address;
  }

  public addContact(contact: Contact): void {
    this.props.contacts.push(contact);
    // this.addDomainEvent(new CheckpointCreated(contact));
  }
  public addInstruction(instruction: Instruction): void {
    this.props.instructions.push(instruction);
  }
  private constructor(props: SiteProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: SiteProps, id?: UniqueEntityID): Result<Site> {
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      { argument: props.siteName, argumentName: 'memberId' }
    ]);

    if (nullGuard.isFailure) {
      return Result.fail<Site>(nullGuard.getErrorValue());
    } else {
      const isNewSite = !!id === false;

      const site = new Site({ ...props, isActive: true }, id);

      if (isNewSite) {
        site.addDomainEvent(new SiteCreated(site));
      }

      return Result.ok<Site>(site);
    }
  }
}
