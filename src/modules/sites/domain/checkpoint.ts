import { Entity } from '../../../shared/domain/Entity';
import { Result } from '../../../shared/core/Result';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Guard } from '../../../shared/core/Guard';

import { SiteId } from './siteId';
import { CheckpointId } from './checkpointId';

interface CheckpointProps {
  checkpointName: string;
  checkpointDescription?: string;
  isActive: boolean;
  checkpointCreationDate: Date;
  checkpointLastUpdateDate: Date;
  checkpointId: CheckpointId;
  latitude: number;
  longitude: number;
  accuracy: number;
  siteId: SiteId;
}

export class Checkpoint extends Entity<CheckpointProps> {
  get checkpointId(): CheckpointId {
    return this.props.checkpointId;
  }
  private constructor(props: CheckpointProps, id?: UniqueEntityID) {
    super(props, id);
  }
  public static create(
    props: CheckpointProps,
    id?: UniqueEntityID
  ): Result<Checkpoint> {
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      { argument: props.checkpointName, argumentName: 'checkpointName' }
    ]);

    if (nullGuard.isFailure) {
      return Result.fail<Checkpoint>(nullGuard.getErrorValue());
    } else {
      const isNewCheckpoint = !!id === false;

      return Result.ok<Checkpoint>(new Checkpoint(props, id));
    }
  }
}
