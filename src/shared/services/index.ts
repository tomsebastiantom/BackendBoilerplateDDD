import { authService } from "../../modules/users/services";
import { DatabaseService } from "./DatabaseService";

const databaseService = new DatabaseService(authService);


export { databaseService }