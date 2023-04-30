import { Site } from "../domain/site";
import { SiteId } from "../domain/siteId";


export interface ISiteRepo {
    save (site: Site): Promise<void>
    delete (site: Site): Promise<void>
    // getAll (): Promise<Site[]>  User Required
    update (siteId: SiteId, site: Site): Promise<void>
    getBySiteId (siteId: SiteId): Promise<Site>   
}