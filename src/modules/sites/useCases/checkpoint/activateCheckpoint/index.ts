import { ActivateCheckpointUseCase } from "./ActivateCheckpointUseCase";
import { ActivateCheckpointController } from "./ActivateCheckpointController";

import { checkpointRepo } from "../../../repos";

const activateCheckpointUseCase = new ActivateCheckpointUseCase(checkpointRepo);
const activateCheckpointController = new ActivateCheckpointController(activateCheckpointUseCase);

export { activateCheckpointUseCase, activateCheckpointController };