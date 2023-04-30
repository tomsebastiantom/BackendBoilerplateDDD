import { BaseController } from '../../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../../../users/infra/http/models/decodedRequest';
import * as express from 'express';

import { DeleteCheckpointDTO } from './DeleteCheckpointDTO';
import { DeleteCheckpointErrors } from './DeleteCheckpointErrors';
import { DeleteCheckpointUseCase } from './DeleteCheckpointUseCase';

export class DeleteCheckpointController extends BaseController {
  private useCase: DeleteCheckpointUseCase;

  constructor(useCase: DeleteCheckpointUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const checkpointId = (req.decoded as any).checkpointId;
    const dto: DeleteCheckpointDTO = {
      checkpointId: checkpointId
    };
    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case DeleteCheckpointErrors.CheckpointIdNotFoundError:
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
