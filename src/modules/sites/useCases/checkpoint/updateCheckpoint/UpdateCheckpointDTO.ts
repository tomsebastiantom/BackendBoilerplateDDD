import { CheckpointId } from '../../../domain/checkpointId';
import { SiteId } from '../../../domain/siteId';

export interface UpdateCheckpointDTO {
    checkpointName: string;
    description?: string;
    isActive?: boolean;
    creationDate: Date;
    lastUpdatedDate: Date;
    checkpointId: CheckpointId;
    latitude?: number;
    longitude?: number;
    siteId: SiteId; 
}
