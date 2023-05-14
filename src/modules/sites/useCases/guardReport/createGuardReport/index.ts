import { CreateGuardReportController } from "./CreateGuardReportController";
import { CreateGuardReportUseCase } from "./CreateGuardReportUseCase";
import { guardReportRepo } from "../../../repos";
const createGuardReportUseCase = new CreateGuardReportUseCase(guardReportRepo);
const createGuardReportController = new CreateGuardReportController(createGuardReportUseCase);

export { createGuardReportController, createGuardReportUseCase };
