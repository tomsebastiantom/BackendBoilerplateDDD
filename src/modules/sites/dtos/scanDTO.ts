import { UserId } from "../../users/domain/userId";
import { CheckpointId } from "../domain/checkpointId";
import { SiteId } from '../domain/siteId';

export interface ScanDTO {
    siteId: SiteId;
    userId: UserId;
    identifier: string;
    timestamp: number;
    checkpointId: CheckpointId;
    location: string;
    comment?: string;
    assets?: string[];
  }