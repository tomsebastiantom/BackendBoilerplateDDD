import { Either, Result, left, right } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { UseCase } from '../../../../../shared/core/UseCase';

import { ISiteRepo } from '../../../repos/siteRepo';
import { AddressDTO, CreateSiteDTO } from './CreateSiteDTO';
import { CreateSiteErrors } from './CreateSiteErrors';
import { CreateSiteResponse } from './CreateSiteResponse';
import { Site } from '../../../domain/site';
import { UniqueEntityID } from '../../../../../shared/domain/UniqueEntityID';
import { Address } from '../../../../../shared/nexa/address';
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
      let address: AddressDTO = {
        city: request.address.city,
        state: request.address.state,

        postalCode: request.address.postalCode
      };
      if (request.address.country) {
        address.country = request.address.country;
      }
      const addressOrError = Address.create(address);

      if (addressOrError.isFailure)
        return left(
          new CreateSiteErrors.AddressNotValidError(
            addressOrError.getErrorValue()
          )
        );
      let newSite: any = {};
      if (request.contacts) {
        const contacts = request.contacts.map((contact) => {
          Contact.create(contact);
        });
        newSite.contacts = contacts;
      }
      if (request.contact) {
        const contact = Contact.create(request.contact);
        newSite.contact = contact;
      }
      if (request.instructions) {
        const instructions = request.instructions.map((instruction) => {
          Instruction.create(instruction);
        });
        newSite.instructions = instructions;
      }
      if (request.instruction) {
        const instruction = Instruction.create(request.instruction);
        newSite.instruction = instruction;
      }

      newSite.siteName = request.siteName;

      newSite.companyName = request.companyName;
      newSite.isActive = true;
      newSite.isArchived = false;
      if (request.tenantId) {
        newSite.tenantId = request.tenantId;
      }

      const siteOrError = Site.create({
        ...newSite,
        address: addressOrError.getValue()
      });
      if (siteOrError.isFailure) {
        return left(
          Result.fail<any>(siteOrError.getErrorValue().toString())
        ) as CreateSiteResponse;
      }

      await this.siteRepo.save(siteOrError.getValue());
      return right(Result.ok<Site>(siteOrError.getValue()));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
