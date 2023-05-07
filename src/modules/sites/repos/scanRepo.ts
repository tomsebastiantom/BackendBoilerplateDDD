import { Checkpoint } from "../domain/checkpoint";
import { SiteId } from "../domain/siteId";
import { CheckpointId } from "../domain/checkpointId";

export interface ICheckpointRepo {
    save (checkpoint: Checkpoint[]|Checkpoint): Promise<void>
    delete (checkpointId: CheckpointId): Promise<void>
    getAll (siteId: SiteId): Promise<Checkpoint[]>
    update (checkpointId: CheckpointId, checkpoint: Checkpoint): Promise<void>
    getByCheckpointId (checkpointId: CheckpointId): Promise<Checkpoint>
}