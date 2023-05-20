import { Either, Result, left, right } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { UseCase } from '../../../../../shared/core/UseCase';

import { ISiteRepo } from '../../../repos/siteRepo';
import { GetSiteByIdDTO } from './GetSiteByIdDTO';
import { GetSiteByIdResponse } from './GetSiteByIdResponse';
import { Site } from '../../../domain/site';


export class GetSiteByIdUseCase
  implements UseCase<GetSiteByIdDTO, Promise<GetSiteByIdResponse>>
{
  private siteRepo: ISiteRepo;

  constructor(siteRepo: ISiteRepo) {
    this.siteRepo = siteRepo;
  }

  public async execute(request: GetSiteByIdDTO): Promise<GetSiteByIdResponse> {
    try {
      if (request.siteId) {
        const site = await this.siteRepo.getBySiteId(request.siteId);
        return right(Result.ok<Site>(site));
      } else if (request.tenantId) {
        const site = await this.siteRepo.getByTenantId(request.tenantId);
        if (Array.isArray(site)) {
          return right(Result.ok<Site[]>(site));
        }
        return right(Result.ok<Site>(site));
      }else{
        return left(new AppError.UnexpectedError('Either siteId or tenantId must be provided'));
      }
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
