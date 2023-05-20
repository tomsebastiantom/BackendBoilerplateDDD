import { Mapper } from '../../../shared/infra/Mapper';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';

import { Checkpoint } from '../domain/checkpoint';
import { CheckpointDTO } from '../dtos/checkpointDTO';

export class CheckpointMap implements Mapper<Checkpoint> {
  public static toDomain(raw: any): Checkpoint {
    const checkpointOrError = Checkpoint.create(
      {
        checkpointName: raw.checkpointName,
        description: raw.description,
        isActive: raw.isActive,
        identifier: raw.identifier,
        siteId: raw.siteId
      },
      new UniqueEntityID(raw.checkpointId)
    );
    checkpointOrError.isFailure
      ? console.log(checkpointOrError.getErrorValue())
      : '';
    return checkpointOrError.isSuccess ? checkpointOrError.getValue() : null;
  }
  public static toPersistence(checkpoint: Checkpoint): any {
    return {
      checkpointId: checkpoint.checkpointId.id.toString(),
      siteId: checkpoint.siteId.id.toString(),
      checkpointName: checkpoint.checkpointName,
      description: checkpoint.description,
      isActive: checkpoint.isActive,
      identifier: checkpoint.identifier
    };
  }

  public static toDTO(checkpoint: Checkpoint): CheckpointDTO {
    return {
      checkpointId: checkpoint.checkpointId.id.toString(),
      siteId: checkpoint.siteId.id.toString(),
      checkpointName: checkpoint.checkpointName,
      description: checkpoint.description,
      isActive: checkpoint.isActive,
      identifier: checkpoint.identifier,
    };
  }
}
