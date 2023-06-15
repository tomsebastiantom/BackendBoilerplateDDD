import { DeleteTenantUserUseCase } from './DeleteTenantUserUseCase';
import { DeleteTenantUserDTO } from './DeleteTenantUserDTO';
import { DeleteTenantUserErrors } from './DeleteTenantUserErrors';
import { BaseController } from '../../../../../shared/infra/http/models/BaseController';
import * as express from 'express';
import { DecodedExpressRequest } from '../../../infra/http/models/decodedRequest';

export class DeleteTenantUserController extends BaseController {
  private useCase: DeleteTenantUserUseCase;

  constructor(useCase: DeleteTenantUserUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const dto: DeleteTenantUserDTO = req.body as DeleteTenantUserDTO;

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case DeleteTenantUserErrors.UserNotFoundError:
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
