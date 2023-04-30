import { ICheckpointRepo } from '../checkpointRepo';
import { Checkpoint } from '../../domain/checkpoint';
import { SiteId } from '../../domain/siteId';
import { CheckpointId } from '../../domain/checkpointId';
import { CheckpointMap } from '../../mappers/checkpointMap';

export class SequelizeCheckpointRepo implements ICheckpointRepo {
  private models: any;
  constructor(models: any) {
    this.models = models;
  }

  async save(checkpoint: Checkpoint[] | Checkpoint): Promise<void> {
    const CheckpointModel = this.models.Checkpoint;
    if (checkpoint instanceof Array) {
      const rawCheckpoints = checkpoint.map((checkpoint) =>
        CheckpointMap.toPersistence(checkpoint)
      );
      await CheckpointModel.bulkCreate(rawCheckpoints);
      return;
    } else {
      const rawCheckpoint = CheckpointMap.toPersistence(checkpoint);
      await CheckpointModel.create(rawCheckpoint);
      return;
    }
  }
  async delete(checkpointId: CheckpointId): Promise<void> {
    const CheckpointModel = this.models.Checkpoint;
    await CheckpointModel.destroy({ where: { checkpointId: checkpointId.id } });
  }

  async getAll(siteId: SiteId): Promise<Checkpoint[]> {
    const CheckpointModel = this.models.Checkpoint;
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
      where: { checkpointId: checkpointId.id }
    });
    return;
  }
  async getByCheckpointId(checkpointId: CheckpointId): Promise<Checkpoint> {
    const CheckpointModel = this.models.Checkpoint;
    const rawCheckpoint = await CheckpointModel.findOne({
      where: { checkpointId: checkpointId.id }
    });
    const checkpoint = CheckpointMap.toDomain(rawCheckpoint);
    return checkpoint;
  }
}
