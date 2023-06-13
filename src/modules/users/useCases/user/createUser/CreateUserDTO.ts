import { AddressDTO } from "../../../../sites/useCases/site/createSite/CreateSiteDTO";

export interface CreateUserDTO {
  username: string;
  email: string;
  phone: string;
  password: string;
  name:string;
  tenantId: string;
  isAdminUser?: boolean;
  address?: AddressDTO;
}

