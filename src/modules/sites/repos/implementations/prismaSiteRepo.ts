import { ISiteRepo } from '../siteRepo';
import { Site } from '../../domain/site';
import { SiteMap } from '../../mappers/siteMap';
import { SiteId } from '../../domain/siteId';
import { TenantId } from '../../../users/domain/tenantId';

export class PrismaSiteRepo implements ISiteRepo {
  private models: any;
  constructor(models: any) {
    this.models = models;
  }

  async save(site: Site): Promise<void> {
    const SiteModel = this.models.Site;
    const rawSite = SiteMap.toPersistence(site);
    await SiteModel.create({ data: { ...rawSite } });
    return;
  }
  async delete(site: Site): Promise<void> {
    const SiteModel = this.models.Site;
    await SiteModel.destroy({ where: { siteId: site.siteId.id } });
    return;
  }

  async update(siteId: SiteId, site: Site): Promise<void> {
    const SiteModel = this.models.Site;
    const rawSite = SiteMap.toPersistence(site);
    await SiteModel.update(rawSite, { where: { siteId: siteId.id } });
    return;
  }
  async getBySiteId(siteId: SiteId): Promise<Site> {
    const SiteModel = this.models.Site;
    const rawSite = await SiteModel.findOne({ where: { siteId: siteId.id } });
    const site = SiteMap.toDomain(rawSite);
    return site;
  }
  async getAll(tenantId: TenantId): Promise<Site[]> {
    const SiteModel = this.models.Site;
    const rawSites = await SiteModel.findAll({
      where: { tenantId: tenantId.id }
    });
    const sites = rawSites.map((rawSite) => SiteMap.toDomain(rawSite));
    return sites;
  }
}
