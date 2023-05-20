import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Result } from '../../../shared/core/Result';
import { Guard } from '../../../shared/core/Guard';

import { SiteId } from './siteId';
import { UserId } from '../../users/domain/userId';
import { Entity } from '../../../shared/domain/Entity';
import { ScanId } from './scanId';
import { CheckpointId } from './checkpointId';
import { Location } from './location';

export interface ScanProps {
  siteId: SiteId;
  userId: UserId;
  identifier: string;
  timestamp: Number;
  checkpointId: CheckpointId;
  location: Location;
  comment?: string;
  assets?: string[];
}

export class Scan extends Entity<ScanProps> {
  get siteId(): SiteId {
    return this.props.siteId;
  }
  get userId(): UserId {
    return this.props.userId;
  }
  set userId(userId: UserId) {
    this.props.userId = userId;
  }
  get scanId(): ScanId {
    return ScanId.create(this._id).getValue();
  }

  get timestamp(): Number {
    return this.props.timestamp;
  }
  set timestamp(timestamp: Number) {
    this.props.timestamp = timestamp;
  }
  get checkpointId(): CheckpointId {
    return this.props.checkpointId;
  }
  set checkpointId(checkpointId: CheckpointId) {
    this.props.checkpointId = checkpointId;
  }
  get identifier(): string {
    return this.props.identifier;
  }
  get comment(): string {
    return this.props.comment;
  }
  get assets(): string[] {
    return this.props.assets;
  }
  get location(): Location {
    return this.props.location;
  }
  set location(location: Location) {
    this.props.location = location;
  }

  private constructor(props: ScanProps, id?: UniqueEntityID) {
    super(props, id);
  }
  //Todo Guard against null or undefined
  public static create(props: ScanProps, id?: UniqueEntityID): Result<Scan> {
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      { argument: props.siteId, argumentName: 'siteId' }
    ]);

    if (nullGuard.isFailure) {
      return Result.fail<Scan>(nullGuard.getErrorValue());
    } else {
      const scan = new Scan({ ...props }, id);

      return Result.ok<Scan>(scan);
    }
  }
}
