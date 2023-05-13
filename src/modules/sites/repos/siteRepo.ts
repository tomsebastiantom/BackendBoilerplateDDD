import { Site } from "../domain/site";
import { SiteId } from "../domain/siteId";
import { TenantId } from "../../users/domain/tenantId";

export interface ISiteRepo {
    save (site: Site): Promise<void>
    delete (site: Site): Promise<void>
    getAll (tenantId:TenantId): Promise<Site[]> 
    update (siteId: SiteId, site: Site): Promise<void>
    getBySiteId (siteId: SiteId): Promise<Site>   
}