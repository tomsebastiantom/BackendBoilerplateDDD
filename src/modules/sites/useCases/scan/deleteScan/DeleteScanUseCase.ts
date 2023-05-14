import { AppError } from '../../../../../shared/core/AppError';
import { Either, left, Result, right } from '../../../../../shared/core/Result';
import { UseCase } from '../../../../../shared/core/UseCase';
import { Site } from '../../../domain/site';
import { ISiteRepo } from '../../../repos/siteRepo';
import { DeleteSiteDTO } from './DeleteSiteDTO';
import { DeleteSiteErrors } from './DeleteSiteErrors';
import { DeleteSiteResponse } from './DeleteSiteResponse';

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
     

   

      await this.siteRepo.delete(site);
      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
