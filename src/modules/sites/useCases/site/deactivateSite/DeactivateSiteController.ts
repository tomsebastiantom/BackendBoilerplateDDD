import { BaseController } from '../../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../../../users/infra/http/models/decodedRequest';
import * as express from 'express';

import { DeactivateSiteDTO } from './DeactivateSiteDTO';
import { DeactivateSiteErrors } from './DeactivateSiteErrors';
import { DeactivateSiteUseCase } from './DeactivateSiteUseCase';
import { SiteId } from '../../../domain/siteId';

export class DeactivateSiteController extends BaseController {
  private useCase: DeactivateSiteUseCase;

  constructor(useCase: DeactivateSiteUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const siteId = (req.decoded as any).siteId;
    const dto: DeactivateSiteDTO = {
      siteId: siteId
    };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case DeactivateSiteErrors.SiteIdNotFoundError:
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
