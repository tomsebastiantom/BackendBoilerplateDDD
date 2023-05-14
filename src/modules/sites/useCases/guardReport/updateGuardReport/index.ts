import { guardReportRepo } from "../../../repos";
import { UpdateGuardReportController } from "./UpdateGuardReportController";
import { UpdateGuardReportUseCase } from "./UpdateGuardReportUseCase";


const updateGuardReportUseCase = new  UpdateGuardReportUseCase(guardReportRepo);
const updateGuardReportController = new UpdateGuardReportController(updateGuardReportUseCase);

export { updateGuardReportController, updateGuardReportUseCase };