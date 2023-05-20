import { BaseController } from '../../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../../../users/infra/http/models/decodedRequest';
import * as express from 'express';

import { GetIncidentReportByUserIdDTO } from './GetIncidentReportByUserIdDTO';
import { GetIncidentReportByUserIdErrors } from './GetIncidentReportByUserIdErrors';
import { GetIncidentReportByUserIdUseCase } from './GetIncidentReportByUserIdUseCase';

export class GetIncidentReportByUserIdController extends BaseController {
  private useCase: GetIncidentReportByUserIdUseCase;

  constructor(useCase: GetIncidentReportByUserIdUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const dto: GetIncidentReportByUserIdDTO = req.body as GetIncidentReportByUserIdDTO;
    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case GetIncidentReportByUserIdErrors.UserIdNotValidError:
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
