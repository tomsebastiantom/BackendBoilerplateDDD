import { BaseController } from '../../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../../../users/infra/http/models/decodedRequest';
import * as express from 'express';

import { GetSiteByIdDTO } from './GetSiteByIdDTO';
import { GetSiteByIdErrors } from './GetSiteByIdErrors';
import { GetSiteByIdUseCase } from './GetSiteByIdUseCase';

export class GetSiteByIdController extends BaseController {
  private useCase: GetSiteByIdUseCase;

  constructor(useCase: GetSiteByIdUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const dto: GetSiteByIdDTO = req.body as GetSiteByIdDTO;
    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case GetSiteByIdErrors.SiteIdNotFoundError:
            return this.fail(res, error.getErrorValue().message);
          case GetSiteByIdErrors.TenantIdNotFoundError:
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
