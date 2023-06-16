import { AfterTenantCreated } from "./afterTenantCreated";
import { AfterUserCreated } from "./afterUserCreated";
import { createTenantUserUseCase } from "../useCases/tenant/createTenantUser";
new AfterTenantCreated();
new AfterUserCreated(createTenantUserUseCase);