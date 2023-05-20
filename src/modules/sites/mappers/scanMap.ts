import { Mapper } from '../../../shared/infra/Mapper';

import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { SiteId } from '../domain/siteId';
import { UserId } from '../../users/domain/userId';
import { Scan } from '../domain/scan';
import { ScanDTO } from '../dtos/scanDTO';
import { CheckpointId } from '../domain/checkpointId';
import { Location } from '../domain/location';

export class ScanMap implements Mapper<Scan> {
  public static toDomain(raw: any): Scan {
    const scanOrError = Scan.create(
      {
        siteId: SiteId.create(raw.siteId).getValue(),
        userId: UserId.create(raw.userId).getValue(),
        identifier: raw.identifier,
        timestamp: raw.timestamp,
        checkpointId: CheckpointId.create(raw.checkpointId).getValue(),
        location: Location.create(raw.location).getValue(),        
        comment: raw.comment,
        assets: raw.assets
      },
      new UniqueEntityID(raw.id)
    );

    scanOrError.isFailure ? console.log(scanOrError.getErrorValue()) : '';

    return scanOrError.isSuccess ? scanOrError.getValue() : null;
  }

  public static toPersistence(scan: Scan): any {
    return {
      id: scan.scanId.id.toString(),
      siteId: scan.siteId.id.toString(),
      userId: scan.userId.id.toString(),
      identifier: scan.identifier,
      timestamp: scan.timestamp,
      checkpointId: scan.checkpointId.id.toString(),
      location: scan.location,
      comment: scan.comment,
      assets: scan.assets,
     };
  }

  public static toDTO(scan: Scan): ScanDTO {
    return {
      siteId: scan.siteId.id.toString(),
      userId: scan.userId.id.toString(),
      identifier: scan.identifier,
      timestamp: scan.timestamp,
      checkpointId: scan.checkpointId.id.toString(),
      location: JSON.stringify(scan.location),
      comment: scan.comment,
      assets: scan.assets
    };
  }
}
