import * as express from 'express';

import { BaseController } from '../../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../../../users/infra/http/models/decodedRequest';
import { CreateScanDTO } from './CreateScanDTO';
import { CreateScanErrors } from './CreateScanErrors';
import { CreateScanUseCase } from './CreateScanUseCase';

export class CreateScanController extends BaseController {
  private useCase: CreateScanUseCase;

  constructor(useCase: CreateScanUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const dto: CreateScanDTO = req.body as CreateScanDTO;
    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case CreateScanErrors.AddressNotValidError:
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
