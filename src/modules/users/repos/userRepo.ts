import { User } from "../domain/user";
import { UserEmail } from "../domain/userEmail";
import { UserName } from "../domain/userName";

export interface IUserRepo {
  exists (userEmail: UserEmail): Promise<boolean>;
  getUserByUserId (userId: string): Promise<User>;
  getUserByUserName (userName: UserName | string): Promise<User>;
  save (user: User): Promise<void>;
  update(userId:string,user:User): Promise<void>;
  getByTenantId(tenantId:string): Promise<User[]|User>;
}
