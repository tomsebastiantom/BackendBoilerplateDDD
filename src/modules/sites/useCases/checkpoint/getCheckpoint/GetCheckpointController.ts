import { BaseController } from '../../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../../../users/infra/http/models/decodedRequest';
import * as express from 'express';

import { UpdateCheckpointDTO } from './UpdateCheckpointDTO';
import { UpdateCheckpointErrors } from './UpdateCheckpointErrors';
import { UpdateCheckpointUseCase } from './UpdateCheckpointUseCase';

export class UpdateCheckpointController extends BaseController {
  private useCase: UpdateCheckpointUseCase;

  constructor(useCase: UpdateCheckpointUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const dto: UpdateCheckpointDTO = req.body as UpdateCheckpointDTO;
    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case UpdateCheckpointErrors.CheckpointIdNotFoundError:
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
