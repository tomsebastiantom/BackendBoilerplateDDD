import { SiteName } from "../../../domain/siteName";

import { Contact } from "../../../domain/contact";
import { Instruction } from "../../../domain/instruction";
import { Address } from "../../../../../shared/nexa/address";

export interface CreateIncidentReportDTO {

    siteName: SiteName;
    address: Address;
    companyName: string;
    contacts?: Contact[];
    isActive: boolean;
    instructions?: Instruction[];
   
  }