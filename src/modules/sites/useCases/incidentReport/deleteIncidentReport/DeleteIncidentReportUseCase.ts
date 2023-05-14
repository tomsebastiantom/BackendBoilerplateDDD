import { Either, Result, left, right } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { UseCase } from '../../../../../shared/core/UseCase';
import { Address } from '../../../../../shared/nexa/address';
import { ISiteRepo } from '../../../repos/siteRepo';
import { DeleteIncidentReportDTO } from './DeleteIncidentReportDTO';
import { DeleteIncidentReportErrors } from './DeleteIncidentReportErrors';
import { DeleteIncidentReportResponse } from './DeleteIncidentReportResponse';
import { Site } from '../../../domain/site';


export class DeleteIncidentReportUseCase
  implements UseCase<DeleteIncidentReportDTO, Promise<DeleteIncidentReportResponse>>
{
  private siteRepo: ISiteRepo;

  constructor(siteRepo: ISiteRepo) {
    this.siteRepo = siteRepo;
  }

  public async execute(request: DeleteIncidentReportDTO): Promise<DeleteIncidentReportResponse> {
  
 
    const addressOrError = Address.create(request.address);
    // const contactsOrError = Contact.create(request.contacts)
    // const instructionsOrError = Instruction.create(request.instructions)
    // if (addressOrError.isFailure) errors.push(addressOrError.error)
    // if (contactsOrError.isFailure) errors.push(contactsOrError.error)
    // if (instructionsOrError.isFailure) errors.push(instructionsOrError.error)
    if (addressOrError.isFailure)
      return left(new DeleteIncidentReportErrors.AddressNotValidError(request.address));
    else {
      const createdSite = Site.create({
        siteName: request.siteName,
        isActive: true,
        companyName: request.companyName,


        address: addressOrError.getValue()
      }).getValue();

      if (request.instructions) {
        createdSite.instructions = request.instructions;
      }
      if (request.contacts) {
        createdSite.contacts = request.contacts;
      }
      
      try {
        await this.siteRepo.save(createdSite);
        return right(Result.ok<void>());
      } catch (err) {
        return left(new AppError.UnexpectedError(err));
      }
    }
  }
}
