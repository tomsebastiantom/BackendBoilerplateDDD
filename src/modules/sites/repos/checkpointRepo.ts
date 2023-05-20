import { Checkpoint } from "../domain/checkpoint";

export interface ICheckpointRepo {
    save (checkpoint: Checkpoint[]|Checkpoint): Promise<void>
    delete (checkpointId: string): Promise<void>
    getBySiteId (siteId: string): Promise<Checkpoint[]|Checkpoint>
    update (checkpointId: string, checkpoint: Checkpoint): Promise<void>
    getByCheckpointId (checkpointId: string): Promise<Checkpoint>
    getByCheckpointByIdentifier (identifier: string): Promise<Checkpoint>
}