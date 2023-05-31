import { AddressDTO } from "../../../../sites/dtos/siteDTO";

export interface CreateTenantDTO {
  name: string;
  address: AddressDTO;
  dbUrl?: string;
 
}

