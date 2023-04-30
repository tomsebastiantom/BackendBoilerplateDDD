
import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { Site } from "../site";

export class SiteCreated implements IDomainEvent {
  public dateTimeOccurred: Date;
  public site: Site;

  constructor (site: Site) {
    this.dateTimeOccurred = new Date();
    this.site = site;
  }
  
  getAggregateId (): UniqueEntityID {
    return this.site.siteId.id;
  }
}