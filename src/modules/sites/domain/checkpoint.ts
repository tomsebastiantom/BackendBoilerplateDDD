import { Guard } from '../../../shared/core/Guard';
import { Result } from '../../../shared/core/Result';
import { Entity } from '../../../shared/domain/Entity';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Id } from '../../../shared/domain/nexa/id';
// import { Location } from '../../../shared/domain/nexa/location';
import { JSONB } from '../../../shared/domain/nexa/json';
type IDENTIFIERTYPE = 'QRCODE' | 'RFID';

interface CheckpointProps {
  checkpointName: string;
  description?: string;
  isActive?: boolean;
  location?: any;
  siteId: string;
  identifierId?: string;
  identifierType?: IDENTIFIERTYPE;
  extras?: JSONB;
}

export class Checkpoint extends Entity<CheckpointProps> {
  get checkpointId(): Id {
    return Id.create(this._id).getValue();
  }

  get identifierId(): string {
    return this.props.identifierId;
  }

  get identifierType(): IDENTIFIERTYPE {
    return this.props.identifierType;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }
  get extras(): JSONB {
    return this.props.extras;
  }
  get location(): any {
    return this.props.location;
  }

  get siteId(): string {
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
  public static create(props: CheckpointProps, id?: UniqueEntityID): Result<Checkpoint> {
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
