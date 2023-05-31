import { IScanRepo } from '../scanRepo';

import { Scan } from '../../domain/scan';

import { ScanMap } from '../../mappers/scanMap';

export class PrismaScanRepo implements IScanRepo {
  private models: any;
  constructor(models: any) {
    this.models = models;
  }
  async save(scan: Scan): Promise<void> {
    const ScanModel = this.models.scan;
    const rawScan = ScanMap.toPersistence(scan);
    await ScanModel.create({ data: { ...rawScan } });
    return;
  }
  async deleteById(scanId: string): Promise<void> {
    const ScanModel = this.models.scan;
    await ScanModel.delete({ where: { id: scanId } });
    return;
  }
  async deleteBySiteId(siteId: string): Promise<void> {
    const ScanModel = this.models.scan;
    await ScanModel.deleteMany({ where: { siteId: siteId } });
    return;
  }
  async deleteByCheckpointId(checkpointId: string): Promise<void> {
    const ScanModel = this.models.scan;
    await ScanModel.deleteMany({ where: { checkpointId: checkpointId } });
    return;
  }
  async deleteByUserId(userId: string): Promise<void> {
    const ScanModel = this.models.scan;
    await ScanModel.deleteMany({ where: { userId: userId } });
    return;
  }

  async update(scanId: string, Scan: Scan): Promise<void> {
    const ScanModel = this.models.scan;
    const rawScan = ScanMap.toPersistence(Scan);
    await ScanModel.update(
      { data: { ...rawScan } },
      { where: { scanId: scanId } }
    );
    return;
  }

  async getByScanId(scanId: string): Promise<Scan> {
    const ScanModel = this.models.scan;
    const rawScan = await ScanModel.findUnique({
      where: { id: scanId }
    });
    const Scan = ScanMap.toDomain(rawScan);
    return Scan;
  }
  async getByCheckpointId(checkpointId: string): Promise<Scan | Scan[]> {
    const ScanModel = this.models.scan;
    const rawScans = await ScanModel.findMany({
      where: { id: checkpointId }
    });
    if (Array.isArray(rawScans)) {
      const Scan = rawScans.map((rawScan) => ScanMap.toDomain(rawScan));
      return Scan;
    } else {
      const Scan = ScanMap.toDomain(rawScans);
      return Scan;
    }
  }

  async getBySiteId(siteId: string): Promise<Scan | Scan[]> {
    const ScanModel = this.models.scan;
    const rawScan = await ScanModel.findMany({ where: { siteId: siteId } });
    if (Array.isArray(rawScan)) {
      const Scan = rawScan.map((rawScan) => ScanMap.toDomain(rawScan));
      return Scan;
    } else {
      const Scan = ScanMap.toDomain(rawScan);
      return Scan;
    }
  }
  async getByUserId(userId: string): Promise<Scan | Scan[]> {
    const ScanModel = this.models.scan;
    const rawScan = await ScanModel.findMany({ where: { userId: userId } });
    if (Array.isArray(rawScan)) {
      const Scan = rawScan.map((rawScan) => ScanMap.toDomain(rawScan));
      return Scan;
    } else {
      const Scan = ScanMap.toDomain(rawScan);
      return Scan;
    }
  }
}
