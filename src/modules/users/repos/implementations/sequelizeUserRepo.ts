import { IUserRepo } from '../userRepo';
import { UserName } from '../../domain/userName';
import { User } from '../../domain/user';
import { UserMap } from '../../mappers/userMap';
import { UserEmail } from '../../domain/userEmail';

export class SequelizeUserRepo  {
  private models: any;

  constructor(models: any) {
    this.models = models;
  }

  async exists(userEmail: UserEmail): Promise<boolean> {
    const UserModel = this.models.user;
    
    const user = await UserModel.findOne({
      where: {
        user_email: userEmail.value
      }
    });
    return !!user === true;
  }
  

  async getUserByUserName(userName: UserName | string): Promise<User> {
    const UserModel = this.models.User;

    const user = await UserModel.findOne({
      where: {
        username:
          userName instanceof UserName ? (<UserName>userName).value : userName
      }
    });
    if (!!user === false) throw new Error('User not found.');
    return UserMap.toDomain(User);
  }

  async getUserByUserId(userId: string): Promise<User> {
    const UserModel = this.models.User;
    const user = await UserModel.findOne({
      where: {
        id: userId
      }
    });
    if (!!user === false) throw new Error('User not found.');
    return UserMap.toDomain(User);
  }

  async save(user: User): Promise<void> {
    const UserModel = this.models.User;
    const exists = await this.exists(user.email);

    if (!exists) {
      const rawSequelizeUser = await UserMap.toPersistence(user);
      await UserModel.create(rawSequelizeUser);
    }

    return;
  }
}
