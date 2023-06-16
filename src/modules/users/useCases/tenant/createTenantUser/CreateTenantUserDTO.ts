import { AddressDTO } from "../../../../sites/useCases/site/createSite/CreateSiteDTO";

export interface CreateTenantUserDTO {
  username: string;
  email: string;
  phone: string;
  password: string;
  name:string;
  tenantId: string;
  isAdminUser?: boolean;
}

