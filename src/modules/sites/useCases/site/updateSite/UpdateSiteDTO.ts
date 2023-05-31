import { ContactDTO } from "../createSite/CreateSiteDTO";
import { InstructionDTO } from "../createSite/CreateSiteDTO";
import { AddressDTO } from "../createSite/CreateSiteDTO";

export interface UpdateSiteDTO {
    siteId:string;
    siteName?: string;
    address?: AddressDTO;
    companyName?: string;
    contact?: ContactDTO;
    contacts?: ContactDTO[];
    instruction?: InstructionDTO;
    instructions?: InstructionDTO[];
    tenantId?: string;
    
  }
