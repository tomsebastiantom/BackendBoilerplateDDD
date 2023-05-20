import { AppError } from '../../../../../shared/core/AppError';
import { Either, left, Result, right } from '../../../../../shared/core/Result';
import { UseCase } from '../../../../../shared/core/UseCase';
import { UniqueEntityID } from '../../../../../shared/domain/UniqueEntityID';
import { Scan } from '../../../domain/scan';
import { IScanRepo } from '../../../repos/scanRepo';
import { ICheckpointRepo } from '../../../repos/checkpointRepo';
import { CreateScanDTO } from './CreateScanDTO';
import { CreateScanResponse } from './CreateScanResponse';
import { CreateScanErrors } from './CreateScanErrors';

export class CreateScanUseCase
  implements UseCase<CreateScanDTO, Promise<CreateScanResponse>>
{
  private scanRepo: IScanRepo;
  private checkpointRepo:ICheckpointRepo;

  constructor(scanRepo: IScanRepo,checkpointRepo:ICheckpointRepo) {
    this.scanRepo = scanRepo;
    this.checkpointRepo=checkpointRepo;
  }

  public async execute(request: CreateScanDTO): Promise<CreateScanResponse> {
    


    try {
      let newScan:any={

        userId: request.userId,
        identifier: request.identifier,
        timestamp: request.timestamp,
        location: request.location,
        


      }
      if(request.comment){
        newScan.comment=request.comment
      }
      if(request.assets){
        newScan.assets=request.assets
      }
      if(request.checkpointId){
        newScan.checkpointId=request.checkpointId
      }
      if(request.siteId){
        newScan.siteId=request.siteId
      }
      if(!request.siteId || !request.checkpointId){
        const checkpoint =  await this.checkpointRepo.getByCheckpointByIdentifier(request.identifier)
        newScan.checkpointId=checkpoint.checkpointId.id.toString()
        newScan.siteId=checkpoint.siteId.id.toString()
      }

     
      
      const scanOrError = Scan.create(newScan,new UniqueEntityID(request.siteId.toString()));
      if(scanOrError.isFailure) {
        return left(
          Result.fail<any>(scanOrError.getErrorValue().toString())
        ) as CreateScanResponse;
      }

      await this.scanRepo.save(scanOrError.getValue());
      return right(Result.ok<Scan>(scanOrError.getValue()));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
