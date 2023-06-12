import { GetTenantByIdErrors } from './GetTenantByIdErrors';
import { GetTenantByIdDTO } from './GetTenantByIdDTO';
import { GetTenantByIdUseCase } from './GetTenantByIdUseCase';
import { BaseController } from '../../../../../shared/infra/http/models/BaseController';
import * as express from 'express';
import { DecodedExpressRequest } from '../../../infra/http/models/decodedRequest';

export class GetTenantByIdController extends BaseController {
  private useCase: GetTenantByIdUseCase;

  constructor(useCase: GetTenantByIdUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const dto: GetTenantByIdDTO = req.body as GetTenantByIdDTO;
   console.log(req);
    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case GetTenantByIdErrors.TenantNotFoundError:
            return this.notFound(res, error.getErrorValue().message);
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
