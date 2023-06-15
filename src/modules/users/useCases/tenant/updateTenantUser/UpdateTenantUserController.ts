import * as express from 'express';

import { BaseController } from '../../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../../infra/http/models/decodedRequest';
import { UpdateTenantUserDTO } from './UpdateTenantUserDTO';
import { UpdateTenantUserErrors } from './UpdateTenantUserErrors';
import { UpdateTenantUserUseCase } from './UpdateTenantUserUseCase';

export class UpdateTenantUserController extends BaseController {
  private useCase: UpdateTenantUserUseCase;

  constructor(useCase: UpdateTenantUserUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const dto: UpdateTenantUserDTO = req.body as UpdateTenantUserDTO;
    // console.log(dto);
    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case UpdateTenantUserErrors.UsernameTakenError:
            return this.conflict(res, error.getErrorValue().message);
          case UpdateTenantUserErrors.EmailAlreadyExistsError:
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
