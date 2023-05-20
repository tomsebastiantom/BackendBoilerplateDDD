import { UseCaseError } from '../../../../../shared/core/UseCaseError';
import { Result } from '../../../../../shared/core/Result';



export namespace DeleteIncidentReportErrors {
  export class IncidentIdNotValidError  extends Result<UseCaseError> {
    constructor(address: string) {
      super(false, {
        message: ` ${address} is not valid `
      } as UseCaseError);
    }
  }
}
