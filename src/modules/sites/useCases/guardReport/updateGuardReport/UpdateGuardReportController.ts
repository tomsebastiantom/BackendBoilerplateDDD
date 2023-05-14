import { BaseController } from '../../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../../../users/infra/http/models/decodedRequest';
import * as express from 'express';
import { UpdateGuardReportUseCase } from './UpdateGuardReportUseCase';
import { UpdateGuardReportDTO } from './UpdateGuardReportDTO';
import { UpdateGuardReportErrors } from './UpdateGuardReportErrors';
import { UseCaseError } from '../../../../../shared/core/UseCaseError';

export class UpdateGuardReportController extends BaseController {
  private useCase: UpdateGuardReportUseCase;

  constructor(useCase: UpdateGuardReportUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const dto: UpdateGuardReportDTO = req.body as UpdateGuardReportDTO;
    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case UpdateGuardReportErrors.ReportIdNotFoundError:
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
