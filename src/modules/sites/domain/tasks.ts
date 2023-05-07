import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Result } from '../../../shared/core/Result';
import { Guard } from '../../../shared/core/Guard';
import { Entity } from '../../../shared/domain/Entity';

import { SiteId } from './siteId';
import { UserId } from '../../users/domain/userId';
import { TaskId } from './taskId';

export interface TaskProps {
  taskId: TaskId;
  siteId?: SiteId;
  userId: UserId;
  creator: UserId;
  startDate: Date;
  endDate: Date;
  recurrent: boolean;
  isActive: boolean;
  sentDate?: Date;
  recipient: string;
}

export class Task extends Entity<TaskProps> {
  get reportId(): TaskId {
    return TaskId.create(this._id).getValue();
  }

  private constructor(props: TaskProps, id?: UniqueEntityID) {
    super(props, id);
  }

  //   public addContact(contact: Contact): void {
  //     this.props.contacts.push(contact);
  //     // this.addDomainEvent(new CheckpointCreated(contact));
  //   }
  //   public addInstruction(instruction: Instruction): void {
  //     this.props.instructions.push(instruction);
  //   }

  public static create(props: TaskProps, id?: UniqueEntityID): Result<Task> {
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      { argument: props.userId, argumentName: 'userId' }
    ]);

    if (nullGuard.isFailure) {
      return Result.fail<Task>(nullGuard.getErrorValue());
    } else {
      const task = new Task({ ...props }, id);

      return Result.ok<Task>(task);
    }
  }
}
