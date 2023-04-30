import { BaseController } from '../../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../../../users/infra/http/models/decodedRequest';
import * as express from 'express';

import { DeactivateCheckpointDTO } from './DeactivateCheckpointDTO';
import { DeactivateCheckpointErrors } from './DeactivateCheckpointErrors';
import { DeactivateCheckpointUseCase } from './DeactivateCheckpointUseCase';
import { CheckpointId } from '../../../domain/checkpointId';

export class DeactivateCheckpointController extends BaseController {
  private useCase: DeactivateCheckpointUseCase;

  constructor(useCase: DeactivateCheckpointUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const checkpointId = (req.decoded as any).checkpointId;
    const dto: DeactivateCheckpointDTO = {
      checkpointId: checkpointId
    };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case DeactivateCheckpointErrors.CheckpointIdNotFoundError:
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
