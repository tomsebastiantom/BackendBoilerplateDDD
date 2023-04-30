
import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { Checkpoint } from "../checkpoint";

export class CheckpointCreated implements IDomainEvent {
  public dateTimeOccurred: Date;
  public checkpoint: Checkpoint;

  constructor (checkpoint: Checkpoint) {
    this.dateTimeOccurred = new Date();
    this.checkpoint = checkpoint;
  }
  
  getAggregateId (): UniqueEntityID {
    return this.checkpoint.checkpointId.id;
  }
}