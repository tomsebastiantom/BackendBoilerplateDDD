import { Mapper } from '../../../shared/infra/Mapper';
import { TenantDTO } from '../dtos/tenantDTO';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Tenant } from '../domain/tenant';
import { Address } from '../../../shared/domain/nexa/address';

export class TenantMap implements Mapper<Tenant> {
  public static toDTO(tenant: Tenant): TenantDTO {
    return {
      id: tenant.tenantId.id.toString(),
      name: tenant.name,
      companyName: tenant.companyName,
      email: tenant.email,
      // password: tenant.password,
      username: tenant.username,
      ...(tenant.phone && { phone: tenant.phone }),
      address: JSON.stringify(tenant.address),
      ...(tenant.dbUrl && { dbUrl: tenant.dbUrl })
    };
  }

  public static toDomain(raw: any): Tenant {
    const tenantOrError = Tenant.create(
      {
        name: raw.name,
        address: Address.create(raw.address).getValue(),
        companyName: raw.companyName,
        email: raw.email,
        password: raw.password,
        username: raw.username,
        ...(raw.phone && { phone: raw.phone }),
        ...(raw.dbUrl && { dbUrl: raw.dbUrl })
      },
      new UniqueEntityID(raw.id)
    );

    tenantOrError.isFailure ? console.log(tenantOrError.getErrorValue()) : '';

    return tenantOrError.isSuccess ? tenantOrError.getValue() : null;
  }

  public static async toPersistence(tenant: Tenant): Promise<any> {
    let password: string = null;
    if (!!tenant.password === true) {
      if (tenant.password.isAlreadyHashed()) {
        password = tenant.password.value;
      } else {
        password = await tenant.password.getHashedValue();
      }
    }
    return {
      id: tenant.tenantId.id.toString(),
      name: tenant.name,
      companyName: tenant.companyName,
      email: tenant.email,
      password: password,
      username: tenant.username,
      ...(tenant.phone && { phone: tenant.phone }),
      address: JSON.stringify(tenant.address),
      ...(tenant.dbUrl && { dbUrl: tenant.dbUrl })
    };
  }
}
