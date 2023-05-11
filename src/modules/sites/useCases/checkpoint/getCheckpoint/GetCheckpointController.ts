import { BaseController } from '../../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../../../users/infra/http/models/decodedRequest';
import * as express from 'express';

import { GetCheckpointDTO } from './GetCheckpointDTO';
import { GetCheckpointErrors } from './GetCheckpointErrors';
import { GetCheckpointUseCase } from './GetCheckpointUseCase';

export class GetCheckpointController extends BaseController {
  private useCase: GetCheckpointUseCase;

  constructor(useCase: GetCheckpointUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const dto: GetCheckpointDTO = req.body as GetCheckpointDTO;
    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case GetCheckpointErrors.CheckpointIdNotFoundError:
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
