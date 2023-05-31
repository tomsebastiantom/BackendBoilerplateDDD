import { Mapper } from '../../../shared/infra/Mapper';
import { AddressDTO } from '../dtos/siteDTO';
import { Address } from '../../../shared/domain/nexa/address';
import { Site } from '../domain/site';
import { SiteDTO } from '../dtos/siteDTO';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';

export class SiteMap implements Mapper<Site> {
  public static toDomain(raw: any): Site {
    let addressDTO: AddressDTO = {
      city: raw.address.city,
      state: raw.address.state,

      postalCode: raw.address.postalCode
    };
    if (raw.address.country) {
      addressDTO.country = raw.address.country;
    }
    const address = Address.create(addressDTO);

    const siteOrError = Site.create(
      {
        siteName: raw.siteName,
        instructions: raw.description,
        isActive: raw.isActive,
        address: address.getValue(),
        companyName: raw.companyName,
        contacts: raw.contacts
      },
      new UniqueEntityID(raw.siteId)
    );
    siteOrError.isFailure ? console.log(siteOrError.getErrorValue()) : '';
    return siteOrError.isSuccess ? siteOrError.getValue() : null;
  }
  public static toPersistence(site: Site): any {
    return {
      id: site.siteId.id.toString(),
      siteName: site.siteName,
      instructions: site.instructions,
      address: site.address,
      isActive: site.isActive,
      companyName: site.companyName,
      contacts: site.contacts,
      tenantId: site.tenantId
    };
  }

  public static toDTO(site: Site): SiteDTO {
    return {
      siteName: site.siteName,
      instructions: site.instructions,
      isActive: site.isActive,
      address: site.address,
      companyName: site.companyName,
      contacts: site.contacts
    };
  }
}
