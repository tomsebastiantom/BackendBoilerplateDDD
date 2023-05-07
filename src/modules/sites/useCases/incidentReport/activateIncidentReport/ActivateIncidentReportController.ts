import { BaseController } from '../../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../../../users/infra/http/models/decodedRequest';
import * as express from 'express';

import { ActivateSiteDTO } from './ActivateSiteDTO';
import { ActivateSiteErrors } from './ActivateSiteErrors';
import { ActivateSiteUseCase } from './ActivateSiteUseCase';
import { SiteId } from '../../../domain/siteId';

export class ActivateSiteController extends BaseController {
  private useCase: ActivateSiteUseCase;

  constructor(useCase: ActivateSiteUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const siteId = (req.decoded as any).siteId;
    const dto: ActivateSiteDTO = {
      siteId: siteId
    };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case ActivateSiteErrors.SiteIdNotFoundError:
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
