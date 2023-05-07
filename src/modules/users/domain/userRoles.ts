
// import { Result } from '../../../shared/core/Result'
// import { Entity } from '../../../shared/domain/Entity';
// import { RoleId } from './roleId';
// import { Routes } from './routes';
// import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';

// export interface UserRoleProps {
//   roleName: string;
//   creationDate: Date;
//   createPermission: Routes;
//   editPermission: Routes;
//   readPermission: Routes;

// }

// export class UserRole extends Entity<UserRoleProps> {
  
//     get roleId(): RoleId {
//         return RoleId.create(this._id).getValue();
//       }
     

//   private constructor (props: UserRoleProps,id?: UniqueEntityID) {
//     super(props,id);
//   }

 

//   public static create (props: UserRoleProps,id?: UniqueEntityID): Result<UserRole> {
   
//       return Result.ok<UserRole>(new UserRole(props,id) );
    
//     }
//   }
