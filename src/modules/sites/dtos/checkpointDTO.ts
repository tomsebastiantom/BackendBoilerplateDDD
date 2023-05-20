

export interface CheckpointDTO {
    checkpointName: string;
    description?: string;
    isActive: boolean;
    creationTimestamp?: Number;
    lastUpdatedTimestamp?: Number;
    checkpointId: String;
    latitude?: number;
    longitude?: number;
    siteId: String; 
    identifier: string;
}
