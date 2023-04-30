export interface CheckpointDTO {
                                
    checkpointName: string;
    checkpointDescription?: string;
    isActive: boolean;
    checkpointCreationDate: Date;
    checkpointLastUpdateDate: Date;
    // checkpointId: CheckpointId;
    latitude: number;
    longitude: number;
    accuracy: number;
    // siteId: SiteId; 
}
