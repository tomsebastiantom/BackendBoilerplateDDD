import { CreateTenantUseCase } from './CreateTenantUseCase';
import { CreateTenantDTO } from './CreateTenantDTO';
import { CreateTenantErrors } from './CreateTenantErrors';
import { BaseController } from '../../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../../infra/http/models/decodedRequest';
import * as express from 'express';
import { CreateTenantResponseDTO } from './CreateTenantDTO';

export class CreateTenantController extends BaseController {
  private useCase: CreateTenantUseCase;

  constructor(useCase: CreateTenantUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    let dto: CreateTenantDTO = req.body as CreateTenantDTO;

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case CreateTenantErrors.TenantNameTakenError:
            return this.conflict(res, error.getErrorValue().message);
            break;
          default:
            return this.fail(res, error.getErrorValue().message);
        }
      } else {
        const dto: CreateTenantResponseDTO =
          result.value.getValue() as CreateTenantResponseDTO;
        return this.ok<CreateTenantResponseDTO>(res, dto);
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
