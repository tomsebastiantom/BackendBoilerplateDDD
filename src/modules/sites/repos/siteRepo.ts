import { Site } from "../domain/site";


export interface ISiteRepo {
    save (site: Site): Promise<void>
    delete (site: Site): Promise<void>
    getAll (): Promise<Site[]>
    update (siteId: string, site: Site): Promise<void>
    getBySiteId (siteId: string): Promise<Site>   
}