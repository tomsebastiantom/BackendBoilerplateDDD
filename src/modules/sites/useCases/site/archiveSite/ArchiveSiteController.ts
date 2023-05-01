import { BaseController } from '../../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../../../users/infra/http/models/decodedRequest';
import * as express from 'express';

import { ArchiveSiteDTO } from './ArchiveSiteDTO';
import { ArchiveSiteErrors } from './ArchiveSiteErrors';
import { ArchiveSiteUseCase } from './ArchiveSiteUseCase';
import { SiteId } from '../../../domain/siteId';

export class ArchiveSiteController extends BaseController {
  private useCase: ArchiveSiteUseCase;

  constructor(useCase: ArchiveSiteUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const siteId = (req.decoded as any).siteId;
    const dto: ArchiveSiteDTO = {
      siteId: siteId
    };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case ArchiveSiteErrors.SiteIdNotFoundError:
            return this.fail(res, error.getErrorValue().message);
        }
      } else {
        return this.ok(res);
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}