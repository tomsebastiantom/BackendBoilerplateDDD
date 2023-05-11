import { Mapper } from '../../../shared/infra/Mapper';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';

import { GuardReport } from '../domain/guardReport';
import { GuardReportDTO } from '../dtos/guardReportDTO';

export class GuardReportMap implements Mapper<GuardReport> {
  public static toDomain(raw: any): GuardReport {
    const GuardReportOrError = GuardReport.create(
      {
        siteId: raw.siteId,
        userId: raw.userId,
        startTimestamp: raw.startTimestamp,
        endTimestamp: raw.endTimestamp,
        sentTimestamp: raw.sentTimestamp,
        recipient: raw.recipent
      },
      new UniqueEntityID(raw.reportId)
    );
    GuardReportOrError.isFailure
      ? console.log(GuardReportOrError.getErrorValue())
      : '';
    return GuardReportOrError.isSuccess ? GuardReportOrError.getValue() : null;
  }
  public static toPersistence(guardReport: GuardReport): any {
    let rawguardReport: any = {
      id: guardReport.guardReportId.id.toString(),
      userId: guardReport.userId.id.toString(),
      startTimestamp: guardReport.startTimestamp,
      endTimestamp: guardReport.endTimestamp
    };
    if (guardReport.recipient) {
      rawguardReport.recipient = guardReport.recipient;
    }
    if (guardReport.siteId) {
      rawguardReport.siteId = guardReport.siteId;
    }
    if (guardReport.sentTimestamp) {
      rawguardReport.sentTimestamp = guardReport.sentTimestamp;
    }
    return rawguardReport;
  }

  public static toDTO(guardReport: GuardReport): GuardReportDTO {
    let dto: GuardReportDTO = {
      siteId: guardReport.siteId,
      userId: guardReport.userId,
      startTimestamp: guardReport.startTimestamp,
      endTimestamp: guardReport.endTimestamp
    };
    if (guardReport.recipient) {
      dto.recipient = guardReport.recipient;
    }
    if (guardReport.siteId) {
      dto.siteId = guardReport.siteId;
    }
    if (guardReport.sentTimestamp) {
      dto.sendTimestamp = guardReport.sentTimestamp;
    }

    return dto;
  }
}


