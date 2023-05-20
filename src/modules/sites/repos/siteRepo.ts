import { Site } from "../domain/site";
import { SiteId } from "../domain/siteId";
import { TenantId } from "../../users/domain/tenantId";

export interface ISiteRepo {
    save (site: Site): Promise<void>
    delete (siteId: string): Promise<void>
    update (siteId: string, site: Site): Promise<void>
    getBySiteId (siteId: string): Promise<Site>   
    getByTenantId (tenantId: string): Promise<Site|Site[]>
}