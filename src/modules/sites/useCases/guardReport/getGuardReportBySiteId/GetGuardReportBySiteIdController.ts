import * as express from 'express';

import { UseCaseError } from '../../../../../shared/core/UseCaseError';
import { BaseController } from '../../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../../../users/infra/http/models/decodedRequest';
import { GetGuardReportBySiteIdDTO } from './GetGuardReportBySiteIdDTO';
import { GetGuardReportBySiteIdErrors } from './GetGuardReportBySiteIdErrors';
import { GetGuardReportBySiteIdUseCase } from './GetGuardReportBySiteIdUseCase';

export class GetGuardReportBySiteIdController extends BaseController {
  private useCase: GetGuardReportBySiteIdUseCase;

  constructor(useCase: GetGuardReportBySiteIdUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const dto: GetGuardReportBySiteIdDTO = req.body as GetGuardReportBySiteIdDTO;
    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case GetGuardReportBySiteIdErrors.ReportForSiteIdNotFoundError:
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
