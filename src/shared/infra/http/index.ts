import { Middleware } from "./utils/Middleware";
import { authService } from "../../../modules/users/services";
import { RequestMiddleware } from "./utils/RequestMiddleware";
const middleware = new Middleware(authService);
const requestMiddleware = new RequestMiddleware();
export { middleware,requestMiddleware }
