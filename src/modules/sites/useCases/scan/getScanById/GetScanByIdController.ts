import * as express from 'express';

import { BaseController } from '../../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../../../users/infra/http/models/decodedRequest';
import { GetScanByIdDTO } from './GetScanByIdDTO';
import { GetScanByIdErrors } from './GetScanByIdErrors';
import { GetScanByIdUseCase } from './GetScanByIdUseCase';

export class GetScanByIdController extends BaseController {
  private useCase: GetScanByIdUseCase;

  constructor(useCase: GetScanByIdUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const dto: GetScanByIdDTO = req.body as GetScanByIdDTO;
    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case GetScanByIdErrors.ScanIdNotValidError:
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
