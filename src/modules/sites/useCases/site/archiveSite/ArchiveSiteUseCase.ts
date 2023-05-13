import { Either, Result, left, right } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { UseCase } from '../../../../../shared/core/UseCase';

import { ISiteRepo } from '../../../repos/siteRepo';
import { ArchiveSiteErrors } from './ArchiveSiteErrors';
import { ArchiveSiteDTO } from './ArchiveSiteDTO';
import { ArchiveSiteResponse } from './ArchiveSiteResponse';
import { Site } from '../../../domain/site';

export class ArchiveSiteUseCase
  implements UseCase<ArchiveSiteDTO, Promise<ArchiveSiteResponse>>
{
  private siteRepo: ISiteRepo;

  constructor(siteRepo: ISiteRepo) {
    this.siteRepo = siteRepo;
  }

  public async execute(request: ArchiveSiteDTO): Promise<ArchiveSiteResponse> {
    try {
      const site: Site = await this.siteRepo.getBySiteId(request.siteId);
      const siteFound = !!site === true;
      if (!siteFound) {
        return left(new ArchiveSiteErrors.SiteIdNotFoundError(request.siteId));
      }

      site.isActive = false;
      // site.lastUpdatedDate = new Date();
      site.isArchived = true;

      await this.siteRepo.save(site);
      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
