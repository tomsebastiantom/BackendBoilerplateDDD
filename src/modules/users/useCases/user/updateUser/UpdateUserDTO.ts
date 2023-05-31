import { AddressDTO } from '../../../../sites/useCases/site/createSite/CreateSiteDTO';

export interface UpdateUserDTO {
  userId: string;
  email?: string;
  name?: string;
  phone?: number;
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
