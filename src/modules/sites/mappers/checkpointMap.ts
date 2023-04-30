import { Mapper } from "../../../shared/infra/Mapper";

import { Checkpoint } from "../domain/checkpoint";

export class CheckpointMap implements Mapper<Checkpoint>{
 public static toDomain (raw: any): Checkpoint {
    return Checkpoint.create({...raw});

 }

}