import { AddressDTO } from '../../../../sites/useCases/site/createSite/CreateSiteDTO';

export interface UpdateTenantUserDTO {
  userId: string;

  name?: string;
  email?: string;
  phone?: string;
  tenantId?: string;
  username?: string;
  password?: string;
  isEmailVerified?: boolean;
  isAdminUser?: boolean;
  isSuperAdmin?: boolean;
  accessToken?: string;
  refreshToken?: string;
  isDeleted?: boolean;
  lastLogin?: Date;
  roles?: string;
  Address?: AddressDTO;
}
