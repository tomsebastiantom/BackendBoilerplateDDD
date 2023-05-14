import { SiteName } from "../../../domain/siteName";

import { Contact } from "../../../domain/contact";
import { Instruction } from "../../../domain/instruction";

export interface DeleteIncidentReportDTO {

    siteName: SiteName;
    address: string;
    companyName: string;
    contacts?: Contact[];
    isActive: boolean;
    instructions?: Instruction[];
   
  }