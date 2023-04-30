import { ActivateCheckpointUseCase } from "./ActivateCheckpointUseCase";
import { ActivateCheckpointController } from "./ActivateCheckpointController";
import { ICheckpointRepo } from "../../../repos/checkpointRepo";
// im
const activateCheckpointUseCase = new ActivateCheckpointUseCase(ICheckpointRepo);