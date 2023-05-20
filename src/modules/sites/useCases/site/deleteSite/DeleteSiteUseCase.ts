import { Either, Result, left, right } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { UseCase } from '../../../../../shared/core/UseCase';

import { ISiteRepo } from '../../../repos/siteRepo';
import { DeleteSiteErrors } from './DeleteSiteErrors';
import { DeleteSiteDTO } from './DeleteSiteDTO';
import { DeleteSiteResponse } from './DeleteSiteResponse';
import { Site } from '../../../domain/site';


export class DeleteSiteUseCase
  implements
    UseCase<DeleteSiteDTO, Promise<DeleteSiteResponse>>
{
  private siteRepo: ISiteRepo;

  constructor(siteRepo: ISiteRepo) {
    this.siteRepo = siteRepo;
  }

  public async execute(
    request: DeleteSiteDTO
  ): Promise<DeleteSiteResponse> {
    try {
      const site:Site = await this.siteRepo.getBySiteId(
        request.siteId
      );
      const siteFound = !!site === true;
      if (!siteFound) {
        return left(
          new DeleteSiteErrors.SiteIdNotFoundError(
            request.siteId
          )
        );
      }
     

   

      await this.siteRepo.delete(request.siteId);
      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
