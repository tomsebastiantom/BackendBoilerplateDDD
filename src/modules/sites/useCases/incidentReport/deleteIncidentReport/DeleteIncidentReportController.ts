import { BaseController } from '../../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../../../users/infra/http/models/decodedRequest';
import * as express from 'express';

import { DeleteIncidentReportDTO } from './DeleteIncidentReportDTO';
import { DeleteIncidentReportErrors } from './DeleteIncidentReportErrors';
import { DeleteIncidentReportUseCase } from './DeleteIncidentReportUseCase';

export class DeleteIncidentReportController extends BaseController {
  private useCase: DeleteIncidentReportUseCase;

  constructor(useCase: DeleteIncidentReportUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const dto: DeleteIncidentReportDTO = req.body as DeleteIncidentReportDTO;
    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case DeleteIncidentReportErrors.IncidentIdNotValidError:
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
