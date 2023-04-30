import { UseCase } from "../../../../../shared/core/UseCase";
import { CreateSiteDTO } from "./CreateSiteDTO";

export class CreateSiteUseCase implements UseCase<CreateSiteDTO,any>{
    public async execute(request: CreateSiteDTO): Promise<any> {
        return null; // todo
      }

}