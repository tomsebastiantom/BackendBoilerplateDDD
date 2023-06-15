import { Mapper } from '../../../shared/infra/Mapper';
import { User } from '../domain/user';
import { UserDTO } from '../dtos/userDTO';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { UserName } from '../domain/userName';
import { UserPassword } from '../domain/userPassword';
import { UserEmail } from '../domain/userEmail';
import { Address } from '../../../shared/domain/nexa/address';
import { TenantId } from '../domain/tenantId';
export class UserMap implements Mapper<User> {
  public static toDTO(user: User): UserDTO {
    return {
      username: user.username.value,
      isEmailVerified: user.isEmailVerified,
      isAdminUser: user.isAdminUser,
      isDeleted: user.isDeleted
    };
  }

  public static toDomain(raw: any): User {
    const userNameOrError = UserName.create({ name: raw.username });
    const userPasswordOrError = UserPassword.create({
      value: raw.password,
      hashed: true
    });
    const userEmailOrError = UserEmail.create(raw.email);
    // console.log(raw.address);
    let AddressOrError = null;
    if (raw.address) AddressOrError = Address.create(raw.address);

    const userOrError = User.create(
      {
        username: userNameOrError.getValue(),
        isAdminUser: raw.isAdminUser,
        name: raw.name,
        tenantId: TenantId.create(raw.tenantId).getValue(),
        isEmailVerified: raw.isEmailVerified,
        ...(raw.phone ? { phone: raw.phone } : {}),
        ...(raw.isAdminUser ? { isAdminUser: raw.isAdminUser } : {}),
        ...(raw.isSuperAdmin ? { isSuperAdmin: raw.isSuperAdmin } : {}),
        ...(raw.accessToken ? { accessToken: raw.accessToken } : {}),
        ...(raw.refreshToken ? { refreshToken: raw.refreshToken } : {}),
        ...(raw.isDeleted ? { isDeleted: raw.isDeleted } : {}),
        ...(raw.lastLogin ? { lastLogin: raw.lastLogin } : {}),
        ...(raw.roles ? { roles: raw.roles } : {}),
        password: userPasswordOrError.getValue(),
        email: userEmailOrError.getValue(),
        ...(raw.address ? { address: AddressOrError.getValue() } : {})
      },
      new UniqueEntityID(raw.id)
    );

    userOrError.isFailure ? console.log(userOrError.getErrorValue()) : '';

    return userOrError.isSuccess ? userOrError.getValue() : null;
  }

  public static async toPersistence(user: User): Promise<any> {
    let password: string = null;
    if (!!user.password === true) {
      if (user.password.isAlreadyHashed()) {
        password = user.password.value;
      } else {
        password = await user.password.getHashedValue();
      }
    }
    let address: any = null;

    if (user.address) {
      address = await Address.toPersistence(user.address);
    }
    return {
      id: user.userId.id.toString(),
      email: user.email.value,
      name: user.name,
      tenantId: user.tenantId.id.toString(),
      isEmailVerified: user.isEmailVerified,
      username: user.username.value,
      password: password,
      ...(user.address ? { address: address } : {}),
      isAdminUser: user.isAdminUser,
      isSuperAdmin: user.isSuperAdmin,
      isDeleted: user.isDeleted,
      lastLogin: user.lastLogin
    };
  }
}

// interface UserProps {

//   isSuperAdmin?: boolean;
//   accessToken?: JWTToken;
//   refreshToken?: RefreshToken;
//   isDeleted?: boolean;
//   lastLogin?: Date;
//   roles?: string;
//   Address?: Address;
// }
