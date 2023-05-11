import { BaseController } from '../../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../../../users/infra/http/models/decodedRequest';
import * as express from 'express';

import { CreateGuardReportDTO } from './CreateIncidentReportDTO';
import { CreateGuardReportErrors } from './CreateIncidentReportErrors';
import { CreateGuardReportUseCase } from './CreateGuardReportUseCase';

export class CreateGuardReportController extends BaseController {
  private useCase: CreateGuardReportUseCase;

  constructor(useCase: CreateGuardReportUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const dto: CreateGuardReportDTO = req.body as CreateGuardReportDTO;
    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case CreateGuardReportErrors.AddressNotValidError:
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
