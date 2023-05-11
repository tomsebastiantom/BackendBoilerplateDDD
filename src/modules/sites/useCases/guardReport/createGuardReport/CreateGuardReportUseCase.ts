import { Either, Result, left, right } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { UseCase } from '../../../../../shared/core/UseCase';

import { ICheckpointRepo } from '../../../repos/checkpointRepo';

import { GuardReport } from '../../../domain/GuardReport';
import { UniqueEntityID } from '../../../../../shared/domain/UniqueEntityID';
import { Address } from '../../../domain/address';
import { Contact } from '../../../domain/contact';
import { Instruction } from '../../../domain/instruction';

export class CreateGuardReportUseCase
  implements UseCase<CreateGuardReportDTO, Promise<CreateGuardReportResponse>>
{
  private GuardReportRepo: IGuardReportRepo;

  constructor(GuardReportRepo: IGuardReportRepo) {
    this.GuardReportRepo = GuardReportRepo;
  }

  public async execute(request: CreateGuardReportDTO): Promise<CreateGuardReportResponse> {
    //Todo Validation and Error Handling
    const errors = [];
    const addressOrError = Address.create(request.address);
    // const contactsOrError = Contact.create(request.contacts)
    // const instructionsOrError = Instruction.create(request.instructions)
    // if (addressOrError.isFailure) errors.push(addressOrError.error)
    // if (contactsOrError.isFailure) errors.push(contactsOrError.error)
    // if (instructionsOrError.isFailure) errors.push(instructionsOrError.error)
    if (addressOrError.isFailure)
      return left(new CreateGuardReportErrors.AddressNotValidError(request.address));
    else {
      const createdGuardReport = GuardReport.create({
        GuardReportName: request.GuardReportName,
        isActive: true,
        companyName: request.companyName,
        creationDate: new Date(),
        lastUpdatedDate: new Date(),
        address: addressOrError.getValue()
      }).getValue();

      if (request.instructions) {
        createdGuardReport.instructions = request.instructions;
      }
      if (request.contacts) {
        createdGuardReport.contacts = request.contacts;
      }
      createdGuardReport.creationDate = new Date();
      createdGuardReport.lastUpdatedDate = new Date();
      try {
        await this.GuardReportRepo.save(createdGuardReport);
        return right(Result.ok<void>());
      } catch (err) {
        return left(new AppError.UnexpectedError(err));
      }
    }
  }
}
