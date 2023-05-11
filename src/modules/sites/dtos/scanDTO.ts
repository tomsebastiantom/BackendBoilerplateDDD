import { CheckpointId } from "../domain/checkpointId";
import { SiteId } from '../domain/siteId';

export interface CheckpointDTO {
                                
    checkpointName: string;
    description?: string;
    isActive: boolean;
    creationTimestamp: Number;
    lastUpdatedTimestamp: Number;
    checkpointId: CheckpointId;
    latitude?: number;
    longitude?: number;
    siteId: SiteId; 
}
