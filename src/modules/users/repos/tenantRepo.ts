import { Tenant } from '../domain/tenant';

export interface ITenantRepo {
  getTenantById(tenantId: string): Promise<Tenant>;
  save(tenant: Tenant): Promise<void>;
  update(tenantId: string, tenant: Tenant): Promise<void>;
  exists(name: string): Promise<boolean>;
  delete(tenantId: string): Promise<void>;
}
