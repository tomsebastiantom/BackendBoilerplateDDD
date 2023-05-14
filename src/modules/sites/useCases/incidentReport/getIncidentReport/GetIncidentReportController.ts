import { BaseController } from '../../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../../../users/infra/http/models/decodedRequest';
import * as express from 'express';

import { GetIncidentReportDTO } from './GetIncidentReportDTO';
import { GetIncidentReportErrors } from './GetIncidentReportErrors';
import { GetIncidentReportUseCase } from './GetIncidentReportUseCase';

export class GetIncidentReportController extends BaseController {
  private useCase: GetIncidentReportUseCase;

  constructor(useCase: GetIncidentReportUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const dto: GetIncidentReportDTO = req.body as GetIncidentReportDTO;
    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case GetIncidentReportErrors.AddressNotValidError:
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
