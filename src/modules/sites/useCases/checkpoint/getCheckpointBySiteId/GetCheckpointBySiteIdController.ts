import { BaseController } from '../../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../../../users/infra/http/models/decodedRequest';
import * as express from 'express';

import { GetCheckpointBySiteIdDTO } from './GetCheckpointBySiteIdDTO';
import { GetCheckpointBySiteIdErrors } from './GetCheckpointBySiteIdErrors';
import { GetCheckpointBySiteIdUseCase } from './GetCheckpointBySiteIdUseCase';

export class GetCheckpointBySiteIdController extends BaseController {
  private useCase: GetCheckpointBySiteIdUseCase;

  constructor(useCase: GetCheckpointBySiteIdUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const dto: GetCheckpointBySiteIdDTO = req.body as GetCheckpointBySiteIdDTO;
    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case GetCheckpointBySiteIdErrors.CheckpointForSiteIdNotFoundError:
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
