import { Site } from "../domain/site";

export interface ISiteRepo {
    save (site: Site): Promise<void>
    delete (siteId: string): Promise<void>
    update (siteId: string, site: Site): Promise<void>
    getBySiteId (siteId: string): Promise<Site>   
    getByTenantId (tenantId: string): Promise<Site|Site[]>
}