import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Result } from '../../../shared/core/Result';
import { Guard } from '../../../shared/core/Guard';
import { Entity } from '../../../shared/domain/Entity';

import { SiteId } from './siteId';
import { ReportId } from './ReportId';
import { UserId } from '../../users/domain/userId';

export interface IncidentReportProps {
  siteId: SiteId;
  userId: UserId;
  timeOfIncident: Date;
  incidentType: string;
  incidentDescription: string;
  photos?: [string];
  videos?: [string];
}

export class IncidentReport extends Entity<IncidentReportProps> {
  get incidentId(): ReportId {
    return ReportId.create(this._id).getValue();
  }

  private constructor(props: IncidentReportProps, id?: UniqueEntityID) {
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
    props: IncidentReportProps,
    id?: UniqueEntityID
  ): Result<IncidentReport> {
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      { argument: props.userId, argumentName: 'userId' }
    ]);

    if (nullGuard.isFailure) {
      return Result.fail<IncidentReport>(nullGuard.getErrorValue());
    } else {
      const guardReport = new IncidentReport({ ...props }, id);

      return Result.ok<IncidentReport>(guardReport);
    }
  }
}
