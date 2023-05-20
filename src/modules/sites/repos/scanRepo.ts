import { Scan } from '../domain/scan';

export interface IScanRepo {
  save(scan: Scan): Promise<void>;
  deleteById(scanId: string): Promise<void>;
  deleteBySiteId(scanId: string): Promise<void>;
  deleteByCheckpointId(scanId: string): Promise<void>;
  deleteByUserId(scanId: string): Promise<void>;
  update(scanId: string, scan: Scan): Promise<void>;
  getByScanId(scanId: string): Promise<Scan>;
  getByCheckpointId(checkpointId: string): Promise<Scan | Scan[]>;
  getBySiteId(siteId: string): Promise<Scan[] | Scan>;
  getByUserId(userId: string): Promise<Scan[] | Scan>;
}
