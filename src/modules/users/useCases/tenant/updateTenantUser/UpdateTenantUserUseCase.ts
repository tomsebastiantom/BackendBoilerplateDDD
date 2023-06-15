import { AppError } from '../../../../../shared/core/AppError';
import { Either, left, Result, right } from '../../../../../shared/core/Result';
import { UseCase } from '../../../../../shared/core/UseCase';
import { User } from '../../../domain/user';
import { UserEmail } from '../../../domain/userEmail';
import { UserName } from '../../../domain/userName';
import { UserPassword } from '../../../domain/userPassword';
import { IUserRepo } from '../../../repos/userRepo';
import { UpdateTenantUserDTO } from './UpdateTenantUserDTO';
import { UpdateTenantUserErrors } from './UpdateTenantUserErrors';
import { UpdateTenantUserResponse } from './UpdateTenantUserResponse';

export class UpdateTenantUserUseCase
  implements UseCase<UpdateTenantUserDTO, Promise<UpdateTenantUserResponse>>
{
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  async execute(request: UpdateTenantUserDTO): Promise<UpdateTenantUserResponse> {
    try {
      const user = await this.userRepo.getUserByUserId(request.userId);
      if (!user) {
        return left(
          new UpdateTenantUserErrors.UserIdNotValidError(request.userId)
        ) as UpdateTenantUserResponse;
      }

      const emailOrError = UserEmail.create(request.email);
      const passwordOrError = UserPassword.create({ value: request.password });
      const usernameOrError = UserName.create({ name: request.username });

      const dtoResult = Result.combine([
        emailOrError,
        passwordOrError,
        usernameOrError
      ]);

      if (dtoResult.isFailure) {
        return left(
          Result.fail<void>(dtoResult.getErrorValue())
        ) as UpdateTenantUserResponse;
      }

      const email: UserEmail = emailOrError.getValue();
      const password: UserPassword = passwordOrError.getValue();
      const username: UserName = usernameOrError.getValue();
      const name = request.name;

      const userOrError: Result<User> = User.create({
        email,
        password,
        username,
        name,
        tenantId: user.tenantId,
        isAdminUser: user.isAdminUser,
        isEmailVerified: user.isEmailVerified,
        isDeleted: user.isDeleted,
        isSuperAdmin: user.isSuperAdmin,
        lastLogin: user.lastLogin,
        phone: user.phone,
        accessToken: user.accessToken
      });

      if (userOrError.isFailure) {
        return left(
          Result.fail<User>(userOrError.getErrorValue().toString())
        ) as UpdateTenantUserResponse;
      }

      const updatedUser: User = userOrError.getValue();

      await this.userRepo.update(request.userId, updatedUser);

      return right(Result.ok<User>(updatedUser));
    } catch (err) {
      return left(new AppError.UnexpectedError(err)) as UpdateTenantUserResponse;
    }
  }
}
