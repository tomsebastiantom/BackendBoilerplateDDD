

export interface CheckpointDTO {
    checkpointName: string;
    description?: string;
    isActive: boolean;
    creationTimestamp?: number;
    lastUpdatedTimestamp?: number;
    checkpointId: string;
    latitude?: number;
    longitude?: number;
    siteId: string; 
    identifier: string;
}
