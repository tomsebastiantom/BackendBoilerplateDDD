import { Tenant } from "../tenant";
import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";

export class TenantCreated implements IDomainEvent {
  public dateTimeOccurred: Date;
  public tenant: Tenant;

  constructor (tenant: Tenant) {
    this.dateTimeOccurred = new Date();
    this.tenant = tenant;
  }

  public getAggregateId (): UniqueEntityID {
    return this.tenant.tenantId.id;
  }
}
