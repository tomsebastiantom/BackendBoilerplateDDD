import { SiteName } from "../../../domain/siteName";
import { Address } from "../../../../../shared/nexa/address";
import { Contact } from "../../../domain/contact";
import { Instruction } from "../../../domain/instruction";

export interface CreateSiteDTO {

    siteName: SiteName;
    address: Address;
    companyName: string;
    contacts?: [Contact];
    isActive: boolean;
    instructions?: [Instruction];
   
  }