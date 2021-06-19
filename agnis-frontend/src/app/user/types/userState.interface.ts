import { UserDataInterface } from '../../shared/types/userData.interface';
import { BackendErrorsInterface } from '../../shared/types/backendErrors.interface';

export interface UserStateInterface {
  selectedUser: UserDataInterface | null;
  isLoading: boolean;
  validationErrors: BackendErrorsInterface | null;
}
