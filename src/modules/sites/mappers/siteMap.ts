import { Mapper } from '../../../shared/infra/Mapper';
import { AddressDTO } from '../dtos/siteDTO';
import { Address } from '../../../shared/domain/nexa/address';
import { Site } from '../domain/site';
import { SiteDTO } from '../dtos/siteDTO';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Contact } from '../domain/contact';
import { Instruction } from '../domain/instruction';

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
    let newSite: any = {};
    if (raw.contacts) {
      const contacts = raw.contacts.map((contact) => {
        return Contact.create(contact).getValue();
      });

      newSite.contacts = contacts;
    }

    if (raw.instructions) {
      const instructions = raw.instructions.map((instruction) => {
        return Instruction.create(instruction).getValue();
      });

      newSite.instructions = instructions;
    }

    const siteOrError = Site.create(
      {
        siteName: raw.siteName,
        instructions: raw.description,
        isActive: raw.isActive,
        address: address.getValue(),
        ...(newSite.instructions ? { instructions: newSite.instructions } : {}),
        ...(newSite.contacts ? { contacts: newSite.contacts } : {}),
        companyName: raw.companyName,
        ...(raw.tenantId ? { tenantId: raw.tenantId } : {})
      },
      new UniqueEntityID(raw.siteId)
    );
    siteOrError.isFailure ? console.log(siteOrError.getErrorValue()) : '';
    return siteOrError.isSuccess ? siteOrError.getValue() : null;
  }
  public static toPersistence(site: Site): any {
    let newSite: any = {};
    if (site.contacts) {
      const contacts = site.contacts.map((contact) => {
        return Contact.toPersistence(contact);
      });

      newSite.contacts = contacts;
    }
    // if (site.contact) {
    //   const contact = Contact.toPersistence(site.contact);
    //   newSite.contact = contact;
    // }
    if (site.instructions) {
      const instructions = site.instructions.map((instruction) => {
        return Instruction.toPersistence(instruction);
      });

      newSite.instructions = instructions;
    }
    if (site.address) {
      newSite.address = Address.toPersistence(site.address);
    }
    // if (site.instruction) {
    //   const instruction = site.instruction;
    //   newSite.instruction = instruction;
    // }
    return {
      id: site.siteId.id.toString(),
      siteName: site.siteName,
      instructions: JSON.stringify(newSite.instructions),
      address: JSON.stringify(newSite.address),
      isActive: site.isActive,
      companyName: site.companyName,
      contacts: JSON.stringify(newSite.contacts),
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
