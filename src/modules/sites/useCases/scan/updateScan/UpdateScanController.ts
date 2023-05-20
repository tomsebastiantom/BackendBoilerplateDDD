import * as express from 'express';

import { BaseController } from '../../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../../../users/infra/http/models/decodedRequest';
import { UpdateScanDTO } from './UpdateScanDTO';
import { UpdateScanErrors } from './UpdateScanErrors';
import { UpdateScanUseCase } from './UpdateScanUseCase';

export class UpdateScanController extends BaseController {
  private useCase: UpdateScanUseCase;

  constructor(useCase: UpdateScanUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const dto: UpdateScanDTO = req.body as UpdateScanDTO;
    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case UpdateScanErrors.ScanIdNotValidError:
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
