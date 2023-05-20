import { UseCaseError } from '../../../../../shared/core/UseCaseError';
import { Result } from '../../../../../shared/core/Result';



export namespace CreateIncidentReportErrors {
  export class SiteIdNotValidError extends Result<UseCaseError> {
    constructor(siteId: string) {
      super(false, {
        message: `Site Id ${siteId} is not valid `
      } as UseCaseError);
    }
  }
  export class UserIdNotValidError extends Result<UseCaseError> {
    constructor(userId: string) {
      super(false, {
        message: `Site Id ${userId} is not valid `
      } as UseCaseError);
    }
  }
  export class ReportIdNotValidError extends Result<UseCaseError> {
    constructor(reportId: string) {
      super(false, {
        message: `Report Id ${reportId} is not valid `
      } as UseCaseError);
    }
  }
}
