import { CreateTenantUserUseCase } from './CreateTenantUserUseCase';
import { CreateTenantUserDTO } from './CreateTenantUserDTO';
import { CreateTenantUserErrors } from './CreateTenantUserErrors';
import { BaseController } from '../../../../../shared/infra/http/models/BaseController';
import { TextUtils } from '../../../../../shared/utils/TextUtils';
import { DecodedExpressRequest } from '../../../infra/http/models/decodedRequest';
import * as express from 'express';

export class CreateTenantUserController extends BaseController {
  private useCase: CreateTenantUserUseCase;

  constructor(useCase: CreateTenantUserUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    let dto: CreateTenantUserDTO = req.body as CreateTenantUserDTO;
    dto = {
      username: TextUtils.sanitize(dto.username),
      email: TextUtils.sanitize(dto.email),
      password: dto.password,
      phone: dto.phone,
      name: dto.name,
      tenantId: dto.tenantId,
      isAdminUser: dto.isAdminUser,
    };
   

    // console.log(dto);
    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case CreateTenantUserErrors.UsernameTakenError:
            return this.conflict(res, error.getErrorValue().message);
          case CreateTenantUserErrors.EmailAlreadyExistsError:
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
