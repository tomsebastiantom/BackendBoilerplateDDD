import { BaseController } from '../../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../../../users/infra/http/models/decodedRequest';
import * as express from 'express';

import { DeleteSiteDTO } from './DeleteSiteDTO';
import { DeleteSiteErrors } from './DeleteSiteErrors';
import { DeleteSiteUseCase } from './DeleteSiteUseCase';
import { SiteId } from '../../../domain/siteId';

export class DeleteSiteController extends BaseController {
  private useCase: DeleteSiteUseCase;

  constructor(useCase: DeleteSiteUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const siteId = (req.decoded as any).siteId;
    const dto: DeleteSiteDTO = {
      siteId: siteId
    };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case DeleteSiteErrors.SiteIdNotFoundError:
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
