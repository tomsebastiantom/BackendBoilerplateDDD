import { AddressDTO } from "../../../../sites/dtos/siteDTO";

export interface CreateTenantDTO {
  companyname: string;
  address: AddressDTO;
  dbUrl?: string;
  email: string;
  password: string;
  phone: string;
  name: string;
  username: string;
}

export interface CreateTenantResponseDTO {
  name: string;
  tenantId: string;
}