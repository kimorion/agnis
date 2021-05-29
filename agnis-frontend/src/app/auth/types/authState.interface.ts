import { UserDataInterface } from '../../shared/types/userData.interface';
import { BackendErrorsInterface } from '../../shared/types/backendErrors.interface';

export interface AuthStateInterface {
  isSubmitting: boolean;
  currentUser: UserDataInterface | null;
  loginValidationErrors: BackendErrorsInterface | null;
  registerValidationErrors: BackendErrorsInterface | null;
}
