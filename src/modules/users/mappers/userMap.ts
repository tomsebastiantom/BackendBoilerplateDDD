
import { Mapper } from '../../../shared/infra/Mapper'
import { User } from '../domain/user';
import { UserDTO } from '../dtos/userDTO';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { UserName } from '../domain/userName';
import { UserPassword } from '../domain/userPassword';
import { UserEmail } from '../domain/userEmail';

export class UserMap implements Mapper<User> {
  public static toDTO (user: User): UserDTO {
    return {
      username: user.username.value,
      isEmailVerified: user.isEmailVerified,
      isAdminUser: user.isAdminUser,
      isDeleted: user.isDeleted
    }
  }

  public static toDomain (raw: any): User {
    const userNameOrError = UserName.create({ name: raw.username });
    const userPasswordOrError = UserPassword.create({ value: raw.password, hashed: true });
    const userEmailOrError = UserEmail.create(raw.email);
console.log('raw', raw);
console.log('userEmailOrError', userEmailOrError);
console.log('userPasswordOrError', userPasswordOrError);
console.log('userNameOrError', userNameOrError);
    const userOrError = User.create({
      username: userNameOrError.getValue(),
      isAdminUser: raw.isAdminUser,
      name:raw.name,
      isEmailVerified: raw.isEmailVerified,
      password: userPasswordOrError.getValue(),
      email: userEmailOrError.getValue(),
    }, new UniqueEntityID(raw.id));

    userOrError.isFailure ? console.log(userOrError.getErrorValue()) : '';

    return userOrError.isSuccess ? userOrError.getValue() : null;
  }

  public static async toPersistence (user: User): Promise<any> {
    let password: string = null;
    if (!!user.password === true) {
      if (user.password.isAlreadyHashed()) {
        password = user.password.value;
      } else {
        password = await user.password.getHashedValue();
      }
    }

    return {
      id: user.userId.id.toString(),
      email: user.email.value,
      name: user.name,
      isEmailVerified: user.isEmailVerified,
      username: user.username.value,
      password: password,
      isAdminUser: user.isAdminUser,
      isSuperAdmin : user.isSuperAdmin,
      isDeleted: user.isDeleted,
      lastLogin: user.lastLogin,
    }
  }
}

// email: UserEmail;
// username: UserName;
// password: UserPassword;
// isEmailVerified?: boolean;
// isAdminUser?: boolean;
// accessToken?: JWTToken;
// refreshToken?: RefreshToken;
// isDeleted?: boolean;
// lastLogin?: Date;