import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Result } from '../../../shared/core/Result';
import { Guard } from '../../../shared/core/Guard';

import { SiteId } from './siteId';
import { SiteCreated } from './events/siteCreated';
import { Contact } from './contact';
import { Address } from '../../../shared/domain/nexa/address';
import { Instruction } from './instruction';
import { SiteName } from './siteName';

export interface SiteProps {
  siteName: SiteName;
  address: Address;
  companyName: string;
  contacts?: Contact[];
  isActive: boolean;
  instructions?: Instruction[];
  isArchived?: boolean;
  tenantId?: string;
}

//Todo Domain Events
export class Site extends AggregateRoot<SiteProps> {
  get siteId(): SiteId {
    return SiteId.create(this._id).getValue();
  }

  get siteName(): SiteName {
    return this.props.siteName;
  }
  get isArchived(): boolean {
    return this.props.isArchived;
  }
  set isArchived(isArchived: boolean) {
    this.props.isArchived = isArchived;
  }
  get address(): Address {
    return this.props.address;
  }
  get companyName(): string {
    return this.props.companyName;
  }
  get isActive(): boolean {
    return this.props.isActive;
  }
  get tenantId(): string {
    return this.props.tenantId;
  }

  set isActive(isActive: boolean) {
    this.props.isActive = isActive;
  }

  get instructions(): Instruction[] {
    return this.props.instructions;
  }
  // set creationTimestamp(creationTimestamp: Number) {
  //   this.props.creationTimestamp = creationTimestamp;
  // }
  // get creationTimestamp(): Number {
  //   return this.props.creationTimestamp;
  // }
  // set lastUpdatedTimestamp(lastUpdatedTimestamp: Number) {
  //   this.props.lastUpdatedTimestamp = lastUpdatedTimestamp;
  // }
  // get lastUpdatedTimestamp(): Number {
  //   return this.props.lastUpdatedTimestamp;
  // }
  get contacts(): Contact[] {
    return this.props.contacts;
  }
  public addContact(contact: Contact): void {
    this.props.contacts.push(contact);
    // this.addDomainEvent(new CheckpointCreated(contact));
  }
  public addInstruction(instruction: Instruction): void {
    this.props.instructions.push(instruction);
  }
  set instructions(instructions: Instruction[]) {
    this.props.instructions = instructions;
  }
  set contacts(contacts: Contact[]) {
    this.props.contacts = contacts;
  }
  private constructor(props: SiteProps, id?: UniqueEntityID) {
    super(props, id);
  }
  //Todo Guard against null or undefined
  public static create(props: SiteProps, id?: UniqueEntityID): Result<Site> {
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      { argument: props.siteName, argumentName: 'siteName' }
    ]);

    if (nullGuard.isFailure) {
      return Result.fail<Site>(nullGuard.getErrorValue());
    } else {
      const isNewSite = !!id === false;

      const site = new Site({ ...props, isActive: true }, id);

      // if (isNewSite) {
      //   site.addDomainEvent(new SiteCreated(site));
      // }

      return Result.ok<Site>(site);
    }
  }
}
