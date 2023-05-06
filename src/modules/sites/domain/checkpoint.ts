import { Entity } from '../../../shared/domain/Entity';
import { Result } from '../../../shared/core/Result';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Guard } from '../../../shared/core/Guard';

import { SiteId } from './siteId';
import { CheckpointId } from './checkpointId';

interface CheckpointProps {
  checkpointName: string;
  description?: string;
  isActive?: boolean;
  creationDate: Date;
  lastUpdatedDate: Date;
  latitude?: number;
  longitude?: number;
  siteId: SiteId;
  identifier?: string;
}

export class Checkpoint extends Entity<CheckpointProps> {
  get checkpointId(): CheckpointId {
    return CheckpointId.create(this._id).getValue();
  }
  set description(description: string) {
    this.props.description = description;
  }
  get identifier(): string {
    return this.props.identifier;
  }
  set identifier(identifier: string) {
    this.props.identifier = identifier;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }
  get lastUpdatedDate(): Date {
    return this.props.lastUpdatedDate;
  }
  set lastUpdatedDate(date: Date) {
    this.props.lastUpdatedDate = date;
  }
  set latitude(latitude: number) {
    this.props.latitude = latitude;
  }
  set longitude(longitude: number) {
    this.props.longitude = longitude;
  }

  set isActive(isActive: boolean) {
    this.props.isActive = isActive;
  }
  get creationDate(): Date {
    return this.props.creationDate;
  }
  get siteId(): SiteId {
    return this.props.siteId;
  }
  get checkpointName(): string {
    return this.props.checkpointName;
  }
  get description(): string {
    return this.props.description;
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
    //Todo Null Guard
    if (nullGuard.isFailure) {
      return Result.fail<Checkpoint>(nullGuard.getErrorValue());
    } else {
      const isNewCheckpoint = !!id === false;

      return Result.ok<Checkpoint>(new Checkpoint(props, id));
    }
  }
}
