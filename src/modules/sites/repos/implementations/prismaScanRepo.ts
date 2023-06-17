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

// async create(Model: any, data: any, mapper: any): Promise<void> {
//   try {
//       await Model.create({ data: mapper.toPersistence(data) });
//       return Promise.resolve();
//   } catch (error) {
//       console.error('Error while saving:', error);
//       return Promise.reject(error);
//   }
// }

// async delete(Model: any, where: any): Promise<void> {
//   try {
//       await Model.delete({ where });
//       return Promise.resolve();
//   } catch (error) {
//       console.error('Error while deleting:', error);
//       return Promise.reject(error);
//   }
// }

// async deleteMany(Model: any, where: any): Promise<void> {
//   try {
//       await Model.deleteMany({ where });
//       return Promise.resolve();
//   } catch (error) {
//       console.error('Error while deleting multiple:', error);
//       return Promise.reject(error);
//   }
// }

// async update(Model: any, where: any, data: any, mapper: any): Promise<void> {
//   try {
//       await Model.update({ where, data: mapper.toPersistence(data) });
//       return Promise.resolve();
//   } catch (error) {
//       console.error('Error while updating:', error);
//       return Promise.reject(error);
//   }
// }

// async findOne(Model: any, where: any, mapper: any): Promise<any> {
//   try {
//       const rawData = await Model.findUnique({ where });
//       return Promise.resolve(mapper.toDomain(rawData));
//   } catch (error) {
//       console.error('Error while finding one:', error);
//       return Promise.reject(error);
//   }
// }

// async findMany(Model: any, where: any, mapper: any): Promise<any[]> {
//   try {
//       const rawData = await Model.findMany({ where });
//       return Promise.resolve(rawData.map(mapper.toDomain));
//   } catch (error) {
//       console.error('Error while finding many:', error);
//       return Promise.reject(error);
//   }
// }

// // Scan related methods
// async save(scan: Scan): Promise<void> {
//   return this.create(this.models.scan, scan, ScanMap);
// }

// async deleteById(scanId: string): Promise<void> {
//   return this.delete(this.models.scan, { id: scanId });
// }

// async deleteBySiteId(siteId: string): Promise<void> {
//   return this.deleteMany(this.models.scan, { siteId: siteId });
// }

// async deleteByCheckpointId(checkpointId: string): Promise<void> {
//   return this.deleteMany(this.models.scan, { checkpointId: checkpointId });
// }

// async deleteByUserId(userId: string): Promise<void> {
//   return this.deleteMany(this.models.scan, { userId: userId });
// }

// async update(scanId: string, scan: Scan): Promise<void> {
//   return this.update(this.models.scan, { id: scanId }, scan, ScanMap);
// }

// async getByScanId(scanId: string): Promise<Scan> {
//   return this.findOne(this.models.scan, { id: scanId }, ScanMap);
// }

// async getByCheckpointId(checkpointId: string): Promise<Scan[]> {
//   return this.findMany(this.models.scan, { checkpointId: checkpointId }, ScanMap);
// }

// async getBySiteId(siteId: string): Promise<Scan[]> {
//   return this.findMany(this.models.scan, { siteId: siteId }, ScanMap);
// }

// async getByUserId(userId: string): Promise<Scan[]> {
//   return this.findMany(this.models.scan, { userId: userId }, ScanMap);
// }
// // ...
// }
