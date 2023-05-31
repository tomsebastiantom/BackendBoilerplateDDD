import * as express from 'express';
import { BaseController } from '../../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../../infra/http/models/decodedRequest';
import { UpdateTenantDTO } from './UpdateTenantDTO';
import { UpdateTenantErrors } from './UpdateTenantErrors';
import { UpdateTenantUseCase } from './UpdateTenantUseCase';

export class UpdateTenantController extends BaseController {
  private useCase: UpdateTenantUseCase;

  constructor(useCase: UpdateTenantUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const dto: UpdateTenantDTO = req.body as UpdateTenantDTO;

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case UpdateTenantErrors.TenantIdNotFoundError:
            return this.conflict(res, error.getErrorValue().message);

          default:
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
