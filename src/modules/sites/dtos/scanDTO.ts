

export interface ScanDTO {
    siteId: string;
    userId: string;
    identifier: string;
    timestamp: number;
    checkpointId: string;
    location: string;
    comment?: string;
    assets?: string[];
    guardName?: string;
    siteName?: string;
  }