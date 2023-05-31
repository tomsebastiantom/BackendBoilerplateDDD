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
    await SiteModel.create({ data: { ...rawSite } });
    return;
  }
  async delete(siteId: string): Promise<void> {
    const SiteModel = this.models.site;
    await SiteModel.delete({ where: { id: siteId } });
    return;
  }

  async update(siteId: string, site: Site): Promise<void> {
    const SiteModel = this.models.site;
    const rawSite = SiteMap.toPersistence(site);
    await SiteModel.update(
      { data: { ...rawSite } },
      { where: { siteId: siteId } }
    );
    return;
  }
  async getBySiteId(siteId: string): Promise<Site> {
    const SiteModel = this.models.site;
    const rawSite = await SiteModel.findUnique({
      where: { siteId: siteId }
    });
    const site = SiteMap.toDomain(rawSite);
    return site;
  }
  async getByTenantId(tenantId: string): Promise<Site | Site[]> {
    const SiteModel = this.models.site;
    const rawSites = await SiteModel.findMany({
      where: { tenantId: tenantId }
    });
    const sites = rawSites.map((rawSite) => SiteMap.toDomain(rawSite));
    return sites;
  }
}
