import { Either, Result, left, right } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { UseCase } from '../../../../../shared/core/UseCase';

import { ISiteRepo } from '../../../repos/siteRepo';
import { UpdateSiteDTO } from './UpdateSiteDTO';
import { UpdateSiteErrors } from './UpdateSiteErrors';
import { UpdateSiteResponse } from './UpdateSiteResponse';
import { Site } from '../../../domain/site';
import { Address } from '../../../../../shared/domain/nexa/address';
import { Contact } from '../../../domain/contact';
import { Instruction } from '../../../domain/instruction';

export class UpdateSiteUseCase
  implements UseCase<UpdateSiteDTO, Promise<UpdateSiteResponse>>
{
  constructor(private siteRepo: ISiteRepo) {}

  public async execute(request: UpdateSiteDTO): Promise<UpdateSiteResponse> {
    try {
      const site = await this.getSite(request.siteId);
      if (!site) {
        return left(new UpdateSiteErrors.SiteIdNotFoundError(request.siteId));
      }

      let addressOrError;
      if (request.address) {
        addressOrError = this.createAddress(request.address);
        if (addressOrError.isFailure) {
          return left(
            new UpdateSiteErrors.AddressNotValidError(
              addressOrError.getErrorValue()
            )
          );
        }
      }

      const newSite = this.buildNewSite(request, site, addressOrError);
      const siteOrError = Site.create(newSite);
      if (siteOrError.isFailure) {
        return left(
          Result.fail<any>(siteOrError.getErrorValue().toString())
        ) as UpdateSiteResponse;
      }

      await this.siteRepo.update(request.siteId, siteOrError.getValue());
      return right(Result.ok<Site>(siteOrError.getValue()));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }

  private async getSite(siteId: string) {
    return await this.siteRepo.getBySiteId(siteId);
  }

  private createAddress(addressRequest: any) {
    const address = {
      city: addressRequest.city,
      state: addressRequest.state,
      postalCode: addressRequest.postalCode,
      country: addressRequest.country ? addressRequest.country : null
    };
    return Address.create(address);
  }

  private buildNewSite(request: UpdateSiteDTO, site: any, addressOrError: any) {
    const newSite: any = {
      ...site,
      siteName: request.siteName ? request.siteName : site.siteName,
      companyName: request.companyName ? request.companyName : site.companyName,
      address: addressOrError ? addressOrError.getValue() : site.address,
      isActive: true,
      isArchived: false,
      tenantId: request.tenantId ? request.tenantId : site.tenantId
    };

    if (request.contacts) {
      newSite.contacts = this.createEntities(request.contacts, Contact.create);
    } else if (request.contact) {
      newSite.contacts = [Contact.create(request.contact)];
    }

    if (request.instructions) {
      newSite.instructions = this.createEntities(
        request.instructions,
        Instruction.create
      );
    } else if (request.instruction) {
      newSite.instructions = [Instruction.create(request.instruction)];
    }

    return newSite;
  }

  private createEntities(entitiesRequest: any[], createEntity: Function) {
    return entitiesRequest.map((entity) => createEntity(entity));
  }
}

//orginal
// implements UseCase<UpdateSiteDTO, Promise<UpdateSiteResponse>>
// {
//   private siteRepo: ISiteRepo;

//   constructor(siteRepo: ISiteRepo) {
//     this.siteRepo = siteRepo;
//   }

//   public async execute(request: UpdateSiteDTO): Promise<UpdateSiteResponse> {
//     try {
//       const site = await this.siteRepo.getBySiteId(request.siteId);
//       if (!site) {
//         return left(new UpdateSiteErrors.SiteIdNotFoundError(request.siteId));
//       }
//       let addressOrError;
//       if (request.address) {
//         let address: any = {
//           city: request.address.city,
//           state: request.address.state,

//           postalCode: request.address.postalCode
//         };
//         if (request.address.country) {
//           address.country = request.address.country;
//         }
//         addressOrError = Address.create(address);

//         if (addressOrError.isFailure)
//           return left(
//             new UpdateSiteErrors.AddressNotValidError(
//               addressOrError.getErrorValue()
//             )
//           );
//       }

//       let newSite: any = {
//         ...site
//       };
//       if (request.contacts) {
//         const contacts = request.contacts.map((contact) => {
//           Contact.create(contact);
//         });
//         newSite.contacts = contacts;
//       }
//       if (request.contact) {
//         const contact = Contact.create(request.contact);
//         newSite.contact = contact;
//       }
//       if (request.instructions) {
//         const instructions = request.instructions.map((instruction) => {
//           Instruction.create(instruction);
//         });
//         newSite.instructions = instructions;
//       }
//       if (request.instruction) {
//         const instruction = Instruction.create(request.instruction);
//         newSite.instruction = instruction;
//       }
//       if (request.siteName) {
//         newSite.siteName = request.siteName;
//       }
//       if (request.companyName) {
//         newSite.companyName = request.companyName;
//       }
//       if (addressOrError) {
//         newSite.address = addressOrError.getValue();
//       }
//       newSite.isActive = true;
//       newSite.isArchived = false;
//       if (request.tenantId) {
//         newSite.tenantId = request.tenantId;
//       }

//       const siteOrError = Site.create({
//         ...newSite
//       });
//       if (siteOrError.isFailure) {
//         return left(
//           Result.fail<any>(siteOrError.getErrorValue().toString())
//         ) as UpdateSiteResponse;
//       }

//       await this.siteRepo.update(request.siteId, siteOrError.getValue());
//       return right(Result.ok<Site>(siteOrError.getValue()));
//     } catch (err) {
//       return left(new AppError.UnexpectedError(err));
//     }
//   }
// }
