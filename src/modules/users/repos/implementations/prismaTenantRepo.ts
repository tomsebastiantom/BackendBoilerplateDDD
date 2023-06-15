import { Tenant } from '../../domain/tenant';
import { TenantMap } from '../../mappers/tenantMap';
import { ITenantRepo } from '../tenantRepo';

export class PrismaTenantRepo implements ITenantRepo {
  private models: any;

  constructor(models: any) {
    this.models = models;
  }

  async getTenantById(tenantId: string): Promise<Tenant> {
    const TenantModel = this.models.tenant;
 
    const tenant = await TenantModel.findUnique({
      where: {
        id: tenantId
      }
    });
    if (!!tenant === false) throw new Error('Tenant not found.');

    return TenantMap.toDomain(tenant);
  }

  async save(tenant: Tenant): Promise<void> {
    const TenantModel = this.models.tenant;
    // const exists = await this.getTenantById(tenant.TenantId.id.toString());

    // if (!exists) {
    const rawTenant = await TenantMap.toPersistence(tenant);
     await TenantModel.create({ data: { ...rawTenant } });
    // }
  
    return;
  }
  
  async exists(name: string): Promise<boolean> {
    const TenantModel = this.models.tenant;
    
    const tenant = await TenantModel.findUnique({
      where: {
        name: name
      }
    });
    return !!tenant === true;
  }

  async update(tenantId: string, tenant: Tenant): Promise<void> {
    const TenantModel = this.models.tenant;
    const rawTenant = await TenantMap.toPersistence(tenant);
    await TenantModel.update({
      where: {
        id: tenantId
      },
      data: { ...rawTenant }
    });
    return;
  }
  async delete(tenantId: string): Promise<void> {
    const TenantModel = this.models.tenant;
    await TenantModel.delete({
      where: {
        id: tenantId
      }
    });
    return;
  }
}
