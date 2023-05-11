import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Result } from '../../../shared/core/Result';
import { Guard } from '../../../shared/core/Guard';
import { Entity } from '../../../shared/domain/Entity';

import { SiteId } from './siteId';
import { ReportId } from './ReportId';
import { UserId } from '../../users/domain/userId';

export interface GuardReportProps {
  siteId?: SiteId;
  userId: UserId;
  startTimestamp: Number;
  endTimestamp: Number;
  sentTimestamp?: Number;
  recipient?: string;
}

export class GuardReport extends Entity<GuardReportProps> {
  get guardReportId(): ReportId {
    return ReportId.create(this._id).getValue();
  }
  get siteId(): SiteId {
    
    return this.props.siteId;
  }

  get userId(): UserId {
    return this.props.userId;
  }

  get startTimestamp(): Number {
    return this.props.startTimestamp;
  }

  get endTimestamp(): Number {
    return this.props.endTimestamp;
  }

  get sentTimestamp(): Number {
   
    return this.props.sentTimestamp;
  }

  get recipient(): string {
   
    return this.props.recipient;
  }
    


  private constructor(props: GuardReportProps, id?: UniqueEntityID) {
    super(props, id);
  }

  

  public static create(
    props: GuardReportProps,
    id?: UniqueEntityID
  ): Result<GuardReport> {
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      { argument: props.userId, argumentName: 'userId' }
    ]);

    if (nullGuard.isFailure) {
      return Result.fail<GuardReport>(nullGuard.getErrorValue());
    } else {
      const guardReport = new GuardReport({ ...props }, id);

      return Result.ok<GuardReport>(guardReport);
    }
  }
}
