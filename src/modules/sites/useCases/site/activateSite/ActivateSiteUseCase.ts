import { Either, Result, left, right } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { UseCase } from '../../../../../shared/core/UseCase';

import { ISiteRepo } from '../../../repos/siteRepo';
import { ActivateSiteErrors } from './ActivateSiteErrors';
import { ActivateSiteDTO } from './ActivateSiteDTO';
import { ActivateSiteResponse } from './ActivateSiteResponse';
import { Site } from '../../../domain/site';



export class ActivateSiteUseCase
  implements
    UseCase<ActivateSiteDTO, Promise<ActivateSiteResponse>>
{
  private siteRepo: ISiteRepo;

  constructor(siteRepo: ISiteRepo) {
    this.siteRepo = siteRepo;
  }

  public async execute(
    request: ActivateSiteDTO
  ): Promise<ActivateSiteResponse> {
    try {
      const Site = await this.siteRepo.getBySiteId(
        request.siteId
      );
      const SiteFound = !!Site === true;
      if (!SiteFound) {
        return left(
          new ActivateSiteErrors.SiteIdNotFoundError(
            request.siteId
          )
        );
      }
      const activatedSite = Site as Site;

      activatedSite.isActive = true;
      activatedSite.lastUpdatedDate = new Date();

      await this.siteRepo.save(activatedSite);
      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
