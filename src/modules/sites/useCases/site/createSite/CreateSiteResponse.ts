
import { Either,Result } from "../../../../../shared/core/Result";
import { AppError } from "../../../../../shared/core/AppError";
import { CreateSiteErrors } from "./CreateSiteErrors";

export type CreateSiteResponse = Either<
  CreateSiteErrors.AddressNotValidError |
  AppError.UnexpectedError ,
  Result<any>|
  Result<void>
>