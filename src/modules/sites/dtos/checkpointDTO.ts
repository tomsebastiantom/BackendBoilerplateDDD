import { CheckpointId } from "../domain/checkpointId";
import { SiteId } from '../domain/siteId';

export interface CheckpointDTO {
                                
    checkpointName: string;
    description?: string;
    isActive: boolean;
    creationDate: Date;
    lastUpdateDate: Date;
    checkpointId: CheckpointId;
    latitude?: number;
    longitude?: number;
    siteId: SiteId; 
}
