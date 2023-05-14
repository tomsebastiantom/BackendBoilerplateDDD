import { ICheckpointRepo } from '../checkpointRepo';
import { Checkpoint } from '../../domain/checkpoint';
import { CheckpointMap } from '../../mappers/checkpointMap';

export class PrismaCheckpointRepo implements ICheckpointRepo {
  private models: any;
  constructor(models: any) {
    this.models = models;
  }

  async save(checkpoint: Checkpoint[] | Checkpoint): Promise<void> {
    const CheckpointModel = this.models.checkpoints;
    if (checkpoint instanceof Array) {
      const rawCheckpoints = checkpoint.map((checkpoint) =>
        CheckpointMap.toPersistence(checkpoint)
      );
      await CheckpointModel.createMany(rawCheckpoints);
      return;
    } else {
      const rawCheckpoint = CheckpointMap.toPersistence(checkpoint);
      await CheckpointModel.create({ data: { ...rawCheckpoint } });
      return;
    }
  }
  async delete(checkpointId: string): Promise<void> {
    const CheckpointModel = this.models.checkpoints;
    await CheckpointModel.destroy({ where: { id: checkpointId } });
  }

  async getBySiteId(siteId: string): Promise<Checkpoint[]|Checkpoint> {
    const CheckpointModel = this.models.checkpoints;
    const rawCheckpoints = await CheckpointModel.findMany({
      where: { siteId: siteId }
    });
 
    if (Array.isArray(rawCheckpoints)) {  
      const checkpoints = rawCheckpoints.map((rawCheckpoint) =>
        CheckpointMap.toDomain(rawCheckpoint)
      );
      return checkpoints;
    } else {  
      const checkpoint = CheckpointMap.toDomain(rawCheckpoints);
      return checkpoint;
    }
  
  }
  async update(
    checkpointId: string,
    checkpoint: Checkpoint
  ): Promise<void> {
    const CheckpointModel = this.models.Checkpoint;
    const rawCheckpoint = CheckpointMap.toPersistence(checkpoint);
    await CheckpointModel.update({
      data: { ...rawCheckpoint },
      where: { id: checkpointId }
    });
    return;
  }
  async getByCheckpointId(checkpointId: string): Promise<Checkpoint> {
    const CheckpointModel = this.models.checkpoints;
    const rawCheckpoint = await CheckpointModel.findUnique({
      where: { id: checkpointId }
    });
   
    const checkpoint = CheckpointMap.toDomain(rawCheckpoint);
    return checkpoint;
  }
}
