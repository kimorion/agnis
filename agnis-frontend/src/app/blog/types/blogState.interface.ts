import { UserDataInterface } from '../../shared/types/userData.interface';
import { BackendErrorsInterface } from '../../shared/types/backendErrors.interface';
import { BlogDataListInterface } from './blogDataList.interface';

export interface BlogStateInterface {
  isSubmitting: boolean;
  currentUser: UserDataInterface | null;
  currentUserBlogs: BlogDataListInterface | null;
  validationErrors: BackendErrorsInterface | null;
}
