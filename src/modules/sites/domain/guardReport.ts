import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Result } from '../../../shared/core/Result';
import { Guard } from '../../../shared/core/Guard';
import { Entity } from '../../../shared/domain/Entity';

import { SiteId } from './siteId';
import { ReportId } from './ReportId';
import { UserId } from '../../users/domain/userId';

export interface GuardReportProps {
  guardReportId: ReportId;
  siteId?: SiteId;
  userId: UserId;
  startDate: Date;
  endDate: Date;
  sentDate: Date;
  recipient: string;
}

export class GuardReport extends Entity<GuardReportProps> {
  get guardReportId(): ReportId {
    return ReportId.create(this._id).getValue();
  }

  private constructor(props: GuardReportProps, id?: UniqueEntityID) {
    super(props, id);
  }

  //   public addContact(contact: Contact): void {
  //     this.props.contacts.push(contact);
  //     // this.addDomainEvent(new CheckpointCreated(contact));
  //   }
  //   public addInstruction(instruction: Instruction): void {
  //     this.props.instructions.push(instruction);
  //   }

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
