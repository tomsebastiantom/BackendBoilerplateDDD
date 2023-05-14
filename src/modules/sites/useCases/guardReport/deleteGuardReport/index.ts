import { DeleteGuardReportController } from "./DeleteGuardReportController";
import { DeleteGuardReportUseCase } from "./DeleteGuardReportUseCase";
import { guardReportRepo } from "../../../repos";

const deleteGuardReportUseCase = new DeleteGuardReportUseCase(guardReportRepo);
const deleteGuardReportController = new DeleteGuardReportController(deleteGuardReportUseCase);

export { deleteGuardReportController, deleteGuardReportUseCase };
