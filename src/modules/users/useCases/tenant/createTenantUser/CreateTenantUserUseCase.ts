import { CreateTenantUserDTO } from './CreateTenantUserDTO';
import { CreateTenantUserErrors } from './CreateTenantUserErrors';
import { Either, Result, left, right } from '../../../../../shared/core/Result';
import { AppError } from '../../../../../shared/core/AppError';
import { User } from '../../../domain/user';
import { UserEmail } from '../../../domain/userEmail';
import { UserName } from '../../../domain/userName';
import { UserPassword } from '../../../domain/userPassword';
import { IUserRepo } from '../../../repos/userRepo';
import { UseCase } from '../../../../../shared/core/UseCase';
import { TenantId } from '../../../domain/tenantId';
import { UniqueEntityID } from '../../../../../shared/domain/UniqueEntityID';
import { Address } from '../../../../../shared/domain/nexa/address';

type Response = Either<
  | CreateTenantUserErrors.EmailAlreadyExistsError
  | CreateTenantUserErrors.UsernameTakenError
  | AppError.UnexpectedError
  | Result<any>,
  Result<void>
>;

export class CreateTenantUserUseCase
  implements UseCase<CreateTenantUserDTO, Promise<Response>>
{ private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }


  async execute(request: CreateTenantUserDTO): Promise<Response> {
   
    const emailOrError = UserEmail.create(request.email);
    const passwordOrError = UserPassword.create({ value: request.password });
    const usernameOrError = UserName.create({ name: request.username });

    const dtoResult = Result.combine([
      emailOrError,
      passwordOrError,
      usernameOrError
    ]);

    if (dtoResult.isFailure) {
      return left(Result.fail<void>(dtoResult.getErrorValue())) as Response;
    }

    const email: UserEmail = emailOrError.getValue();
    const password: UserPassword = passwordOrError.getValue();
    const username: UserName = usernameOrError.getValue();
    const name = request.name;
    const phone = request.phone;
    const tenantId = request.tenantId;
    if (!tenantId) return left(Result.fail<void>('TenantId is required'));

    try {
      const userAlreadyExists = await this.userRepo.exists(email);
      if (userAlreadyExists) {
        return left(
          new CreateTenantUserErrors.EmailAlreadyExistsError(email.value)
        ) as Response;
      }

      try {
        const alreadyCreatedUserByUserName =
          await this.userRepo.getUserByUserName(username);

        const userNameTaken = !!alreadyCreatedUserByUserName === true;

        if (userNameTaken) {
          return left(
            new CreateTenantUserErrors.UsernameTakenError(username.value)
          ) as Response;
        }
      } catch (err) {}
      // const addressOrError = Address.create(request.address);

      // if (addressOrError.isFailure) {
      //   return left(
      //     Result.fail<User>(addressOrError.getErrorValue().toString())
      //   ) as Response;
      // }

      const userOrError: Result<User> = User.createLoginUser({
        email,
        password,
        username,
        name,
        phone,
        // ...(request.address ? { address: addressOrError.getValue() } : {}),
        isAdminUser: request.isAdminUser,
        tenantId: TenantId.create(
          new UniqueEntityID(request.tenantId)
        ).getValue()
      });

      if (userOrError.isFailure) {
        return left(
          Result.fail<User>(userOrError.getErrorValue().toString())
        ) as Response;
      }

      const user: User = userOrError.getValue();

      await this.userRepo.save(user);

      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err)) as Response;
    }
  }
}
