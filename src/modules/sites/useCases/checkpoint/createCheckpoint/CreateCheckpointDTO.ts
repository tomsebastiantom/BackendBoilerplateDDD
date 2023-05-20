import { CheckpointId } from '../../../domain/checkpointId';
import { SiteId } from '../../../domain/siteId';

export interface CreateCheckpointDTO {
    checkpointName: string;
    description?: string;
    siteId: SiteId;
    identifier: string;
}
