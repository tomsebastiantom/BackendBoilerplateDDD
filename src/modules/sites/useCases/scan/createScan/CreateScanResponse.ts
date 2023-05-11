
import { Either,Result } from "../../../../../shared/core/Result";
import { AppError } from "../../../../../shared/core/AppError";
import { CreateScanErrors } from "./CreateScanErrors";

export type CreateScanResponse = Either<
  CreateScanErrors.AddressNotValidError |
  AppError.UnexpectedError |
  Result<any>,
  Result<void>
>