
import { Result } from '../../../../../shared/core/Result';
import { UseCaseError } from '../../../../../shared/core/UseCaseError';

export namespace UpdateIncidentReportErrors {
  export class IncidentReportIdNotValidError extends Result<UseCaseError> {
    constructor(incidentId: string) {
      super(false, {
        message: ` ${incidentId} is not valid`
      } as UseCaseError);
    }
  }
}
