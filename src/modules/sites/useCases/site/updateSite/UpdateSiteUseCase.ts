import { Either, Result, left, right } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { UseCase } from '../../../../../shared/core/UseCase';

import { ISiteRepo } from '../../../repos/siteRepo';
import { UpdateSiteDTO } from './UpdateSiteDTO';
import { UpdateSiteErrors } from './UpdateSiteErrors';
import { UpdateSiteResponse } from './UpdateSiteResponse';
import { Site } from '../../../domain/site';
import { UniqueEntityID } from '../../../../../shared/domain/UniqueEntityID';
import { Address } from '../../../domain/address';
import { Contact } from '../../../domain/contact';
import { Instruction } from '../../../domain/instruction';

export class UpdateSiteUseCase
  implements UseCase<UpdateSiteDTO, Promise<UpdateSiteResponse>>
{
  private siteRepo: ISiteRepo;

  constructor(siteRepo: ISiteRepo) {
    this.siteRepo = siteRepo;
  }

  public async execute(request: UpdateSiteDTO): Promise<UpdateSiteResponse> {
    //Todo Validation and Error Handling
  
    const addressOrError = Address.create(request.address);
    // const contactsOrError = Contact.Update(request.contacts)
    // const instructionsOrError = Instruction.Update(request.instructions)
    // if (addressOrError.isFailure) errors.push(addressOrError.error)
    // if (contactsOrError.isFailure) errors.push(contactsOrError.error)
    // if (instructionsOrError.isFailure) errors.push(instructionsOrError.error)
    if (addressOrError.isFailure)
      return left(new UpdateSiteErrors.AddressNotValidError(request.address));
    else {
      const updatedSite = Site.create({
        siteName: request.siteName,
        isActive: true,
        companyName: request.companyName,
        creationDate: new Date(),
        lastUpdatedDate: new Date(),
        address: addressOrError.getValue()
      },new UniqueEntityID(request.siteId.toString())).getValue();
// Todo array of instruction make anything not required since only changed value needs to be send
      if (request.instructions) {
        updatedSite.instructions = request.instructions;
      }
      if (request.contacts) {
        updatedSite.contacts = request.contacts;
      }
      updatedSite.creationDate = new Date();
      updatedSite.lastUpdatedDate = new Date();
      try {
        await this.siteRepo.save(updatedSite);
        return right(Result.ok<void>());
      } catch (err) {
        return left(new AppError.UnexpectedError(err));
      }
    }
  }
}