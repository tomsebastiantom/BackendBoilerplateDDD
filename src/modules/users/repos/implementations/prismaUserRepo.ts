import { IUserRepo } from '../userRepo';
import { UserName } from '../../domain/userName';
import { User } from '../../domain/user';
import { UserMap } from '../../mappers/userMap';
import { UserEmail } from '../../domain/userEmail';


export class PrismaUserRepo implements IUserRepo {
  private models: any;

  constructor(models: any) {
    this.models = models;
  }

  async exists(userEmail: UserEmail): Promise<boolean> {
    const UserModel = this.models.users;

    const user = await UserModel.findUnique({
      where: {
        email: userEmail.value
      }
    });
    return !!user === true;
  }

  async getUserByUserName(userName: UserName | string): Promise<User> {
    const UserModel = this.models.users;

    const user = await UserModel.findUnique({
      where: {
        username:
          userName instanceof UserName ? (<UserName>userName).value : userName
      }
    });
    if (!!user === false) throw new Error('User not found.');

    return UserMap.toDomain(user);
  }

  async getUserByUserId(userId: string): Promise<User> {
    const UserModel = this.models.users;
    const user = await UserModel.find({
      where: {
        id: userId
      }
    });

    if (!!user === false) throw new Error('User not found.');
    return UserMap.toDomain(User);
  }

  async save(user: User): Promise<void> {
    const UserModel = this.models.users;
    const exists = await this.exists(user.email);

    if (!exists) {
      const rawSequelizeUser = await UserMap.toPersistence(user);
      await UserModel.create({ data: { ...rawSequelizeUser } });
    }

    return;
  }
  async getByTenantId(tenantId: string): Promise<User[] | User> {
    const UserModel = this.models.users;
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
    const UserModel = this.models.users;
    const rawSequelizeUser = await UserMap.toPersistence(user);
    await UserModel.update({
      where: {
        id: userId
      },
      data: { ...rawSequelizeUser }
    });
    return;
  }
}
