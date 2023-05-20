import * as express from 'express';

import { BaseController } from '../../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../../../users/infra/http/models/decodedRequest';
import { DeleteScanDTO } from './DeleteScanDTO';
import { DeleteScanErrors } from './DeleteScanErrors';
import { DeleteScanUseCase } from './DeleteScanUseCase';

export class DeleteScanController extends BaseController {
  private useCase: DeleteScanUseCase;

  constructor(useCase: DeleteScanUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const dto: DeleteScanDTO = req.body as DeleteScanDTO;
    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case DeleteScanErrors.ScanIdNotValidError:
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
