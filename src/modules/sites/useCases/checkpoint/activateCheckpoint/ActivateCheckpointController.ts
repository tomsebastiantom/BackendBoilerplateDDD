import { BaseController } from '../../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../../../users/infra/http/models/decodedRequest';
import * as express from 'express';

import { ActivateCheckpointDTO } from './ActivateCheckpointDTO';
import { ActivateCheckpointErrors } from './ActivateCheckpointErrors';
import { ActivateCheckpointUseCase } from './ActivateCheckpointUseCase';
import { CheckpointId } from '../../../domain/checkpointId';

export class ActivateCheckpointController extends BaseController {
  private useCase: ActivateCheckpointUseCase;

  constructor(useCase: ActivateCheckpointUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const checkpointId = (req.decoded as any).checkpointId;
    const dto: ActivateCheckpointDTO = {
      checkpointId: checkpointId
    };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case ActivateCheckpointErrors.CheckpointIdNotFoundError:
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
