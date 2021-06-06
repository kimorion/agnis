import { UserDataInterface } from '../../shared/types/userData.interface';

export interface UserStateInterface {
  selectedUser: UserDataInterface | null;
  isLoading: boolean;
}
