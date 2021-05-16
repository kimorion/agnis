import { UserDataInterface } from '../../shared/types/userDataInterface';
import { BackendErrorsInterface } from '../../shared/types/backendErrors.interface';

export interface AuthStateInterface {
  isSubmitting: boolean;
  currentUser: UserDataInterface | null;
  validationErrors: BackendErrorsInterface | null;
}
