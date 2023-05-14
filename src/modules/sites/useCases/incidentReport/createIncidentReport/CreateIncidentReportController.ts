import { BaseController } from '../../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../../../users/infra/http/models/decodedRequest';
import * as express from 'express';

import { CreateIncidentReportDTO } from './CreateIncidentReportDTO';
import { CreateIncidentReportErrors } from './CreateIncidentReportErrors';
import { CreateIncidentReportUseCase } from './CreateIncidentReportUseCase';

export class CreateIncidentReportController extends BaseController {
  private useCase: CreateIncidentReportUseCase;

  constructor(useCase: CreateIncidentReportUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const dto: CreateIncidentReportDTO = req.body as CreateIncidentReportDTO;
    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case CreateIncidentReportErrors.AddressNotValidError:
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
