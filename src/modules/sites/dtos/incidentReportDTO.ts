import { Address } from '../../../shared/nexa/address';
import { SiteId } from '../domain/siteId';
import { SiteName } from '../domain/siteName';
import { Contact } from '../domain/contact';
import { Instruction } from '../domain/instruction';

export interface SiteDTO {
  siteId: SiteId;
  siteName: SiteName;
  address: Address;
  companyName: string;
  contacts?: [Contact];
  isActive: boolean;
  instructions?: [Instruction];
  creationDate: Date;
  lastUpdatedDate: Date;
  isArchived?: boolean;
}
