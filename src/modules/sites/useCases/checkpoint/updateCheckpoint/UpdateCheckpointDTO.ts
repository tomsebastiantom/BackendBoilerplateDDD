

export interface UpdateCheckpointDTO {
    checkpointName?: string;
    description?: string;
    isActive?: boolean;
    checkpointId: string;
    latitude?: number;
    longitude?: number;
    siteId?: string; 
}
