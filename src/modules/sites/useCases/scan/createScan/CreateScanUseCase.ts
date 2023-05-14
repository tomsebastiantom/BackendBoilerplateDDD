import { AppError } from '../../../../../shared/core/AppError';
import { Either, left, Result, right } from '../../../../../shared/core/Result';
import { UseCase } from '../../../../../shared/core/UseCase';
import { UniqueEntityID } from '../../../../../shared/domain/UniqueEntityID';
import { Address } from '../../../domain/address';
import { Contact } from '../../../domain/contact';
import { Instruction } from '../../../domain/instruction';
import { Scan } from '../../../domain/Scan';
import { IScanRepo } from '../../../repos/ScanRepo';
import { CreateScanDTO } from './CreateScanDTO';
import { CreateScanErrors } from './CreateScanErrors';
import { CreateScanResponse } from './CreateScanResponse';

export class CreateScanUseCase
  implements UseCase<CreateScanDTO, Promise<CreateScanResponse>>
{
  private ScanRepo: IScanRepo;

  constructor(ScanRepo: IScanRepo) {
    this.ScanRepo = ScanRepo;
  }

  public async execute(request: CreateScanDTO): Promise<CreateScanResponse> {
    //Todo Validation and Error Handling
    const errors = [];
    const addressOrError = Address.create(request.address);
    // const contactsOrError = Contact.create(request.contacts)
    // const instructionsOrError = Instruction.create(request.instructions)
    // if (addressOrError.isFailure) errors.push(addressOrError.error)
    // if (contactsOrError.isFailure) errors.push(contactsOrError.error)
    // if (instructionsOrError.isFailure) errors.push(instructionsOrError.error)
    if (addressOrError.isFailure)
      return left(new CreateScanErrors.AddressNotValidError(request.address));
    else {
      const createdScan = Scan.create({
        ScanName: request.ScanName,
        isActive: true,
        companyName: request.companyName,
        creationDate: new Date(),
        lastUpdatedDate: new Date(),
        address: addressOrError.getValue()
      }).getValue();

      if (request.instructions) {
        createdScan.instructions = request.instructions;
      }
      if (request.contacts) {
        createdScan.contacts = request.contacts;
      }
      createdScan.creationDate = new Date();
      createdScan.lastUpdatedDate = new Date();
      try {
        await this.ScanRepo.save(createdScan);
        return right(Result.ok<void>());
      } catch (err) {
        return left(new AppError.UnexpectedError(err));
      }
    }
  }
}
