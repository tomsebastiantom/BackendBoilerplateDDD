import { BaseController } from '../../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../../../users/infra/http/models/decodedRequest';
import * as express from 'express';

import { GetIncidentReportBySiteIdDTO } from './GetIncidentReportBySiteIdDTO';
import { GetIncidentReportBySiteIdErrors } from './GetIncidentReportBySiteIdErrors';
import { GetIncidentReportBySiteIdUseCase } from './GetIncidentReportBySiteIdUseCase';

export class GetIncidentReportBySiteIdController extends BaseController {
  private useCase: GetIncidentReportBySiteIdUseCase;

  constructor(useCase: GetIncidentReportBySiteIdUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const dto: GetIncidentReportBySiteIdDTO =
      req.body as GetIncidentReportBySiteIdDTO;
    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case GetIncidentReportBySiteIdErrors.IncidentIdForSiteIdNotValidError:
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