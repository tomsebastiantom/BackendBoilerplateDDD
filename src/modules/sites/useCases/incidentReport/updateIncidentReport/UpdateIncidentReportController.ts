import * as express from 'express';

import { BaseController } from '../../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../../../users/infra/http/models/decodedRequest';
import { UpdateIncidentReportDTO } from './UpdateIncidentReportDTO';
import { UpdateIncidentReportErrors } from './UpdateIncidentReportErrors';
import { UpdateIncidentReportUseCase } from './UpdateIncidentReportUseCase';

export class UpdateIncidentReportController extends BaseController {
  private useCase: UpdateIncidentReportUseCase;

  constructor(useCase: UpdateIncidentReportUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const dto: UpdateIncidentReportDTO = req.body as UpdateIncidentReportDTO;
    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case UpdateIncidentReportErrors.IncidentReportIdNotValidError:
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
