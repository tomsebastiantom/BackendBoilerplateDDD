import { ICheckpointRepo } from '../checkpointRepo';
import { Checkpoint } from '../../domain/checkpoint';
import { SiteId } from '../../domain/siteId';
import { CheckpointId } from '../../domain/checkpointId';
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
      await CheckpointModel.bulkCreate(rawCheckpoints);
      return;
    } else {
      const rawCheckpoint = CheckpointMap.toPersistence(checkpoint);
      await CheckpointModel.create({ data: { ...rawCheckpoint } });
      return;
    }
  }
  async delete(checkpointId: CheckpointId): Promise<void> {
    const CheckpointModel = this.models.checkpoints;
    await CheckpointModel.destroy({ where: { id: checkpointId.id } });
  }

  async getAll(siteId: SiteId): Promise<Checkpoint[]> {
    const CheckpointModel = this.models.checkpoints;
    const rawCheckpoints = await CheckpointModel.findAll({
      where: { siteId: siteId.id }
    });
    const checkpoints = rawCheckpoints.map((rawCheckpoint) =>
      CheckpointMap.toDomain(rawCheckpoint)
    );
    return checkpoints;
  }
  async update(
    checkpointId: CheckpointId,
    checkpoint: Checkpoint
  ): Promise<void> {
    const CheckpointModel = this.models.Checkpoint;
    const rawCheckpoint = CheckpointMap.toPersistence(checkpoint);
    await CheckpointModel.update(rawCheckpoint, {
      where: { id: checkpointId.id }
    });
    return;
  }
  async getByCheckpointId(checkpointId: CheckpointId): Promise<Checkpoint> {
    const CheckpointModel = this.models.checkpoints;
    const rawCheckpoint = await CheckpointModel.findUnique({
      where: { id: checkpointId.id }
    });
    const checkpoint = CheckpointMap.toDomain(rawCheckpoint);
    return checkpoint;
  }
}
