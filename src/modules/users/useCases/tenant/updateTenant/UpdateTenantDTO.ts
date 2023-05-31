import { AddressDTO } from '../../../../sites/useCases/site/createSite/CreateSiteDTO';

export interface UpdateTenantDTO {
  tenantId: string;
  name: string;
  address: AddressDTO;
  dbUrl: string;
}
