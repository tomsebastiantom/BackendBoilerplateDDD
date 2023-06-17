import { ISiteRepo } from '../siteRepo';
import { Site } from '../../domain/site';
import { SiteMap } from '../../mappers/siteMap';

export class PrismaSiteRepo implements ISiteRepo {
  private models: any;
  constructor(models: any) {
    this.models = models;
  }

  async save(site: Site): Promise<void> {
    const SiteModel = this.models.site;
    const rawSite = SiteMap.toPersistence(site);
    try {
        await SiteModel.create({ data: { ...rawSite } });
        return Promise.resolve();
    } catch (error) {
        console.error('Error while saving site:', error);
        return Promise.reject(error);
    }
}

async delete(siteId: string): Promise<void> {
    const SiteModel = this.models.site;
    try {
        await SiteModel.delete({ where: { id: siteId } });
        return Promise.resolve();
    } catch (error) {
        console.error('Error while deleting site:', error);
        return Promise.reject(error);
    }
}

async update(siteId: string, site: Site): Promise<void> {
    const SiteModel = this.models.site;
    const rawSite = SiteMap.toPersistence(site);
    try {
        await SiteModel.update(
            { where: { siteId: siteId } }, 
            { data: { ...rawSite } }
        );
        return Promise.resolve();
    } catch (error) {
        console.error('Error while updating site:', error);
        return Promise.reject(error);
    }
}

async getBySiteId(siteId: string): Promise<Site> {
    const SiteModel = this.models.site;
    try {
        const rawSite = await SiteModel.findUnique({
            where: { siteId: siteId }
        });
        const site = SiteMap.toDomain(rawSite);
        return Promise.resolve(site);
    } catch (error) {
        console.error('Error while fetching site:', error);
        return Promise.reject(error);
    }
}

async getByTenantId(tenantId: string): Promise<Site | Site[]> {
    const SiteModel = this.models.site;
    try {
        const rawSites = await SiteModel.findMany({
            where: { tenantId: tenantId }
        });
        const sites = rawSites.map((rawSite) => SiteMap.toDomain(rawSite));
        return Promise.resolve(sites);
    } catch (error) {
        console.error('Error while fetching sites by tenantId:', error);
        return Promise.reject(error);
    }
}
}
