import { Mapper } from '../../../shared/infra/Mapper';
import { TenantDTO } from '../dtos/tenantDTO';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Tenant } from '../domain/tenant';
import { Address } from '../../../shared/domain/nexa/address';

export class TenantMap implements Mapper<Tenant> {
  public static toDTO(tenant: Tenant): TenantDTO {
    return {
      id: tenant.TenantId.id.toString(),
      name: tenant.name,
      address: JSON.stringify(tenant.address),
      ...(tenant.dbUrl && { dbUrl: tenant.dbUrl })
    };
  }

  public static toDomain(raw: any): Tenant {
    const tenantOrError = Tenant.create(
      {
        name: raw.name,
        address: Address.create(raw.address).getValue(),
        ...(raw.dbUrl && { dbUrl: raw.dbUrl }),
      },
      new UniqueEntityID(raw.id)
    );

    tenantOrError.isFailure ? console.log(tenantOrError.getErrorValue()) : '';

    return tenantOrError.isSuccess ? tenantOrError.getValue() : null;
  }

  public static async toPersistence(tenant: Tenant): Promise<any> {
    return {
        id: tenant.TenantId.id.toString(),
        name: tenant.name,
        address: JSON.stringify(tenant.address),
        ...(tenant.dbUrl && { dbUrl: tenant.dbUrl }),
    };
  }
}
