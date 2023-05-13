import { IScanRepo } from '../scanRepo';
import { SiteId } from '../../domain/siteId';
import { CheckpointId } from '../../domain/checkpointId';
import { Scan } from '../../domain/scan';
import { ScanId } from '../../domain/scanId';
import { UserId } from '../../../users/domain/userId';
import { ScanMap } from '../../mappers/scanMap';

export class PrismaScanRepo implements IScanRepo {
  private models: any;
  constructor(models: any) {
    this.models = models;
  }
  async save(scan: Scan): Promise<void> {
    const SiteModel = this.models.Scan;
    const rawSite = ScanMap.toPersistence(scan);
    await SiteModel.create({ data: { ...rawSite } });
    return;
  }
  async delete(scanId: ScanId): Promise<void> {
    const SiteModel = this.models.Scan;
    await SiteModel.destroy({ where: { id: scanId.id } });
    return;
  }

  async update(ScanId: ScanId, Scan: Scan): Promise<void> {
    const ScanModel = this.models.Scan;
    const rawScan = ScanMap.toPersistence(Scan);
    await ScanModel.update(rawScan, { where: { ScanId: ScanId.id } });
    return;
  }
  async getByCheckpointId(checkpointId: CheckpointId): Promise<Scan | [Scan]> {
    const ScanModel = this.models.Scan;
    const rawScans = await ScanModel.findAll({
      where: { id: checkpointId.id }
    });
    const Scans = rawScans.map((rawScan) => ScanMap.toDomain(rawScan));
    return Scans;
  }
  async getAllBySiteId(siteId: SiteId): Promise<Scan | [Scan]> {
    const ScanModel = this.models.Scan;
    const rawScan = await ScanModel.findAll({ where: { siteId: siteId.id } });
    const Scan = ScanMap.toDomain(rawScan);
    return Scan;
  }
  async getAllByUserId(userId: UserId): Promise<Scan | [Scan]> {
    const ScanModel = this.models.Scan;
    const rawScan = await ScanModel.findAll({ where: { userId: userId.id } });
    const Scan = ScanMap.toDomain(rawScan);
    return Scan;
  }
}
