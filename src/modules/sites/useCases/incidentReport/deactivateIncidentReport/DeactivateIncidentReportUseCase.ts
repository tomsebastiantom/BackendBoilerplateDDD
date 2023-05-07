import { Either, Result, left, right } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { UseCase } from '../../../../../shared/core/UseCase';

import { ISiteRepo } from '../../../repos/siteRepo';
import { DeactivateSiteErrors } from './DeactivateSiteErrors';
import { DeactivateSiteDTO } from './DeactivateSiteDTO';
import { DeactivateSiteResponse } from './DeactivateSiteResponse';
import { Site } from '../../../domain/site';


export class DeactivateSiteUseCase
  implements
    UseCase<DeactivateSiteDTO, Promise<DeactivateSiteResponse>>
{
  private siteRepo: ISiteRepo;

  constructor(siteRepo: ISiteRepo) {
    this.siteRepo = siteRepo;
  }

  public async execute(
    request: DeactivateSiteDTO
  ): Promise<DeactivateSiteResponse> {
    try {
      const site:Site = await this.siteRepo.getBySiteId(
        request.siteId
      );
      const siteFound = !!site === true;
      if (!siteFound) {
        return left(
          new DeactivateSiteErrors.SiteIdNotFoundError(
            request.siteId
          )
        );
      }
     

      site.isActive = false;
      site.lastUpdatedDate = new Date();

      await this.siteRepo.save(site);
      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
