import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Result } from '../../../shared/core/Result';
import { Guard } from '../../../shared/core/Guard';

import { ValueObject } from '../../../shared/domain/ValueObject';

export interface LocationProps {
  geom: {
    type: string;
    coordinates: number[];
  };
  timestamp: number;
  altitude: number;
  heading: number;
  altitudeAccuracy: number;
  speed: number;
  accuracy: number;
  mocked: boolean;
}

export class Location extends ValueObject<LocationProps> {
  private constructor(props: LocationProps) {
    super(props);
  }

  public static create(
    props: LocationProps,
    id?: UniqueEntityID
  ): Result<Location> {
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      //   { argument: props.userId, argumentName: 'userId' }
    ]);

    if (nullGuard.isFailure) {
      return Result.fail<Location>(nullGuard.getErrorValue());
    } else {
      const location = new Location({ ...props });

      return Result.ok<Location>(location);
    }
  }
}
