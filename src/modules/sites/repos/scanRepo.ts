import { SiteId } from '../domain/siteId';
import { CheckpointId } from '../domain/checkpointId';
import { Scan } from '../domain/scan';
import { ScanId } from '../domain/scanId';
import { UserId } from '../../users/domain/userId';

export interface IScanRepo {
  save(scan: Scan): Promise<void>;
  delete(scanId: ScanId): Promise<void>;
  update(scanId: ScanId, scan: Scan): Promise<void>;
  getByCheckpointId(checkpointId: CheckpointId): Promise<Scan | [Scan]>;
  getAllBySiteId(siteId: SiteId): Promise<[Scan] | Scan>;
  getAllByUserId(userId: UserId): Promise<[Scan] | Scan>;
}
