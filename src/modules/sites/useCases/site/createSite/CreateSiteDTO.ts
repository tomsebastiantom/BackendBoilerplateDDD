
export interface CreateSiteDTO {
    // siteId: SiteId;
    // siteName: SiteName;
    // address: Address;
    companyName: string;
    // contacts: [Contact];
    isActive: boolean;
    // instructions: [Instruction];
    siteCreationDate: Date;
    siteLastUpdatedDate: Date;
}import { CheckpointId } from '../../../domain/checkpointId';
import { SiteId } from '../../../domain/siteId';

export interface CreateCheckpointDTO {
    checkpointName: string;
    description?: string;
    siteId: SiteId;
}
