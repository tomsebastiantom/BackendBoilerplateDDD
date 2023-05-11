import { Checkpoint } from "../domain/checkpoint";
import { SiteId } from "../domain/siteId";
import { CheckpointId } from "../domain/checkpointId";

export interface IScanRepo {
    save (checkpoint: Checkpoint[]|Checkpoint): Promise<void>
    delete (checkpointId: CheckpointId): Promise<void>
    getAll (siteId: SiteId): Promise<Checkpoint[]>
    getByCheckpointId (checkpointId: CheckpointId): Promise<Checkpoint>
}