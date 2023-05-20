

export interface ScanDTO {
    siteId: String;
    userId: String;
    identifier: string;
    timestamp: Number;
    checkpointId: String;
    location: string;
    comment?: string;
    assets?: string[];
  }