export interface UpdateScanDTO {
  scanId: string;
  siteId?: string;
  userId?: string;
  identifier?: string;
  timestamp?: Number;
  checkpointId?: string;
  location?: string;
  comment?: string;
  assets?: string[];
}

