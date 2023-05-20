import { UseCaseError } from '../../../../../shared/core/UseCaseError';
import { Result } from '../../../../../shared/core/Result';

export namespace GetIncidentReportByIdErrors {
  export class IncidentIdNotValidError extends Result<UseCaseError> {
    constructor(incidentId: string) {
      super(false, {
        message: ` ${incidentId} is not valid`
      } as UseCaseError);
    }
  }
}
