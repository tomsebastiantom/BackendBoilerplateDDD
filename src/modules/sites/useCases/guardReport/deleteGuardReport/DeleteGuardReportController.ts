import { BaseController } from '../../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../../../users/infra/http/models/decodedRequest';
import * as express from 'express';

import { DeleteGuardReportDTO } from './DeleteGuardReportDTO';
import { DeleteGuardReportErrors } from './DeleteGuardReportErrors';
import { DeleteGuardReportUseCase } from './DeleteGuardReportUseCase';

export class DeleteGuardReportController extends BaseController {
  private useCase: DeleteGuardReportUseCase;

  constructor(useCase: DeleteGuardReportUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const dto: DeleteGuardReportDTO = req.body as DeleteGuardReportDTO;
    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case DeleteGuardReportErrors.GuardReportIdNotValidError:
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
