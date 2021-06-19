import { RoleLinkInterface } from './roleLink.interface';

export interface UserDataInterface {
  id: string;
  login: string;
  firstName: string | null;
  lastName: string | null;
  birthDate: Date | null;
  bio: string | null;
  roleLinks: RoleLinkInterface[];
}
