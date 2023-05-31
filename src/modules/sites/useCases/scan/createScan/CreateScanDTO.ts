
export interface CreateScanDTO {
  siteId?: string;
  userId: string;
  identifier: string;
  timestamp: Number;
  checkpointId?: string;
  location: string;
  comment?: string;
  assets?: string[];
  guardName: string;
  siteName: string;
  }
