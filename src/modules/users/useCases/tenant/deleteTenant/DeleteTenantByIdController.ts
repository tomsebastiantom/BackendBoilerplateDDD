import { DeleteTenantByIdErrors } from './DeleteTenantByIdErrors';
import { DeleteTenantByIdDTO } from './DeleteTenantByIdDTO';
import { DeleteTenantByIdUseCase } from './DeleteTenantByIdUseCase';
import { BaseController } from '../../../../../shared/infra/http/models/BaseController';
import * as express from 'express';
import { DecodedExpressRequest } from '../../../infra/http/models/decodedRequest';

export class DeleteTenantByIdController extends BaseController {
  private useCase: DeleteTenantByIdUseCase;

  constructor(useCase: DeleteTenantByIdUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const dto: DeleteTenantByIdDTO = req.body as DeleteTenantByIdDTO;

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case DeleteTenantByIdErrors.TenantNotFoundError:
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
