import { AfterTenantCreated } from "./afterTenantCreated";
import { createUserUseCase } from "../useCases/user/createUser";

new AfterTenantCreated(createUserUseCase);
