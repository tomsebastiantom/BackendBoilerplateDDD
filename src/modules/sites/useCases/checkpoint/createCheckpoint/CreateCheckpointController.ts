import { BaseController } from '../../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../../../users/infra/http/models/decodedRequest';
import * as express from 'express';

import { CreateCheckpointDTO } from './CreateCheckpointDTO';
import { CreateCheckpointErrors } from './CreateCheckpointErrors';
import { CreateCheckpointUseCase } from './CreateCheckpointUseCase';

export class CreateCheckpointController extends BaseController {
  private useCase: CreateCheckpointUseCase;

  constructor(useCase: CreateCheckpointUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const dto: CreateCheckpointDTO = req.body as CreateCheckpointDTO;
    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case CreateCheckpointErrors.SiteIdNotFoundError:
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
