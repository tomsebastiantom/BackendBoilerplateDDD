import { Checkpoint } from "../domain/checkpoint";
import { SiteId } from "../domain/siteId";


export interface ICheckpointRepo {
    save (checkpoint: Checkpoint): Promise<void>
    delete (checkpoint: Checkpoint): Promise<void>
    getAll (siteId: SiteId): Promise<Checkpoint[]>
    update (checkpointId: string, checkpoint: Checkpoint): Promise<void>
    getByCheckpointId (checkpointId: string): Promise<Checkpoint>
}