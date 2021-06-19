import { UserDataInterface } from './userData.interface';
import { RoleDataInterface } from './roleData.interface';

export interface RoleLinkInterface {
  user: UserDataInterface;
  role: RoleDataInterface;
}
