import { Either, Result, left, right } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { UseCase } from '../../../../../shared/core/UseCase';

import { ISiteRepo } from '../../../repos/siteRepo';
import { AddressDTO, CreateSiteDTO } from './CreateSiteDTO';
import { CreateSiteErrors } from './CreateSiteErrors';
import { CreateSiteResponse } from './CreateSiteResponse';
import { Site } from '../../../domain/site';
import { Address } from '../../../../../shared/domain/nexa/address';
import { Contact } from '../../../domain/contact';
import { Instruction } from '../../../domain/instruction';

export class CreateSiteUseCase
  implements UseCase<CreateSiteDTO, Promise<CreateSiteResponse>>
{
  private siteRepo: ISiteRepo;

  constructor(siteRepo: ISiteRepo) {
    this.siteRepo = siteRepo;
  }

  public async execute(request: CreateSiteDTO): Promise<CreateSiteResponse> {
    try {
      const addressOrError = Address.create(request.address);

      if (addressOrError.isFailure)
        return left(
          new CreateSiteErrors.AddressNotValidError(
            addressOrError.getErrorValue()
          )
        );
      let newSite: any = {};
      if (request.contacts) {
        const contacts = request.contacts.map((contact) => {
          return Contact.create(contact).getValue();
        });

        newSite.contacts = contacts;
      }
      if (request.contact) {
        const contact = Contact.create(request.contact);
        newSite.contacts = [contact.getValue()];
      }
      if (request.instructions) {
        const instructions = request.instructions.map((instruction) => {
          return Instruction.create(instruction).getValue();
        });

        newSite.instructions = instructions;
      }
      if (request.instruction) {
        const instruction = Instruction.create(request.instruction);

        newSite.instructions = [instruction.getValue()];
      }

      newSite.siteName = request.siteName;

      newSite.companyName = request.companyName;
      newSite.isActive = true;
      newSite.isArchived = false;
      if (request.tenantId) {
        newSite.tenantId = request.tenantId;
      }
      // else{
      //   newSite.tenantId = request.decoded.tenantId
      // }

      const siteOrError = Site.create({
        ...newSite,
        address: addressOrError.getValue()
      });

      if (siteOrError.isFailure) {
        return left(
          Result.fail<any>(siteOrError.getErrorValue().toString())
        ) as CreateSiteResponse;
      }
      try{
        await this.siteRepo.save(siteOrError.getValue());
      } catch (err) {
        return left(new AppError.UnexpectedError(err));
      }

    
      return right(Result.ok<Site>(siteOrError.getValue()));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
