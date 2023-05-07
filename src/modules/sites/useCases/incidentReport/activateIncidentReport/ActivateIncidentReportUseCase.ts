import { Either, Result, left, right } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { UseCase } from '../../../../../shared/core/UseCase';

import { ISiteRepo } from '../../../repos/siteRepo';
import { ActivateSiteErrors } from './ActivateSiteErrors';
import { ActivateSiteDTO } from './ActivateSiteDTO';
import { ActivateSiteResponse } from './ActivateSiteResponse';
import { Site } from '../../../domain/site';

export class ActivateSiteUseCase
  implements UseCase<ActivateSiteDTO, Promise<ActivateSiteResponse>>
{
  private siteRepo: ISiteRepo;

  constructor(siteRepo: ISiteRepo) {
    this.siteRepo = siteRepo;
  }

  public async execute(
    request: ActivateSiteDTO
  ): Promise<ActivateSiteResponse> {
    try {
      const site: Site = await this.siteRepo.getBySiteId(request.siteId);
      const siteFound = !!site === true;
      if (!siteFound) {
        return left(new ActivateSiteErrors.SiteIdNotFoundError(request.siteId));
      }

      site.isActive = true;
      if (site.isArchived) {
        site.isArchived = false;
      }
      site.lastUpdatedDate = new Date();

      await this.siteRepo.save(site);
      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
