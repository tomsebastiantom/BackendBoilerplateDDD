import { IUserRepo } from '../userRepo';
import { UserName } from '../../domain/userName';
import { User } from '../../domain/user';
import { UserMap } from '../../mappers/userMap';
import { UserEmail } from '../../domain/userEmail';


export class PrismaUserRepo implements IUserRepo {
  private models: any;

  constructor(models: any) {
    // console.log(`[PrismaUserRepo]: Constructing PrismaUserRepo`,models);
    this.models = models;
  }

  async exists(userEmail: UserEmail): Promise<boolean> {
    const UserModel = this.models.user;
  //  console.log(`[PrismaUserRepo]: Checking if user exists ${userEmail.value}`,UserModel);
    const user = await UserModel.findUnique({
      where: {
        email: userEmail.value
      }
    });
    return !!user === true;
  }

  async getUserByUserName(userName: UserName | string): Promise<User> {
    const UserModel = this.models.user;
    const user = await UserModel.findUnique({
      where: {
        username:
          userName instanceof UserName ? (<UserName>userName).value : userName
      }
    });
    if (!!user === false) throw new Error('User not found.');
  // console.log(`[PrismaUserRepo]: Got user by username ${userName}`,user);
    return UserMap.toDomain(user);
  }

  async getUserByUserId(userId: string): Promise<User> {
    const UserModel = this.models.user;
    const user = await UserModel.find({
      where: {
        id: userId
      }
    });

    if (!!user === false) throw new Error('User not found.');
    return UserMap.toDomain(User);
  }

  async save(user: User): Promise<void> {
    const UserModel = this.models.user;
    const exists = await this.exists(user.email);

    if (!exists) {
      const rawUser = await UserMap.toPersistence(user);
      // console.log(`[PrismaUserRepo]: Saving user ${user.username.value}`,rawUser);
      await UserModel.create({ data: { ...rawUser } });
    }

    return;
  }
  async getByTenantId(tenantId: string): Promise<User[] | User> {
    const UserModel = this.models.user;
    const user = await UserModel.find({
      where: {
        tenantId: tenantId
      }
    });

    if (!!user === false) throw new Error('User not found.');
    if (user.length > 1) {
      return user.map((user) => UserMap.toDomain(user));
    } else {
      return UserMap.toDomain(User);
    }
  }
  async update(userId: string, user: User): Promise<void> {
    const UserModel = this.models.user;
    const rawUser = await UserMap.toPersistence(user);
    await UserModel.update({
      where: {
        id: userId
      },
      data: { ...rawUser }
    });
    return;
  }
}
