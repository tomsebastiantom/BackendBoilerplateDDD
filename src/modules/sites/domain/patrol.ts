import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Result } from '../../../shared/core/Result';
import { Guard } from '../../../shared/core/Guard';
import { Entity } from '../../../shared/domain/Entity';

import { SiteId } from './siteId';
import { Instruction } from './instruction';
import { PatrolId } from './patrolId';
import { PatrolType } from './patrolType';
import { UserId } from '../../users/domain/userId';

export interface PatrolProps {
  siteId?: SiteId;
  type: PatrolType;
  userId: UserId;
  siteIds?: [SiteId];
  instructions?: [Instruction];
 }

export class Patrol extends Entity<PatrolProps> {
  get patrolId(): PatrolId {
    return PatrolId.create(this._id).getValue();
  }
  get siteId(): SiteId {
    return this.props.siteId;
  }
  get type(): PatrolType {
    return this.props.type;
  }
  get userId(): UserId {
    return this.props.userId;
  }
  get siteIds(): [SiteId] {
    return this.props.siteIds;
  }
  get instructions(): [Instruction] {
    return this.props.instructions;
  }
 
  set instructions(instructions: [Instruction]) {
    this.props.instructions = instructions;
  }
  set siteIds(siteIds: [SiteId]) {
    this.props.siteIds = siteIds;
  }
  set siteId(siteId: SiteId) {
    this.props.siteId = siteId;
  }
  set type(type: PatrolType) {
    this.props.type = type;
  }
  set userId(userId: UserId) {
    this.props.userId = userId;
  }
  private constructor(props: PatrolProps, id?: UniqueEntityID) {
    super(props, id);
  }

  
  public static create(
    props: PatrolProps,
    id?: UniqueEntityID
  ): Result<Patrol> {
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      { argument: props.userId, argumentName: 'userId' }
    ]);

    if (nullGuard.isFailure) {
      return Result.fail<Patrol>(nullGuard.getErrorValue());
    } else {
      const patrol = new Patrol({ ...props }, id);

      return Result.ok<Patrol>(patrol);
    }
  }
}
