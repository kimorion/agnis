import { BackendErrorsInterface } from '../../shared/types/backendErrors.interface';
import { BlogDataListInterface } from './blogDataList.interface';
import { BlogDataInterface } from './blogData.interface';

export interface BlogStateInterface {
  isSubmitting: boolean;
  isLoading: boolean;
  activeBlog: BlogDataInterface | null;
  currentUserBlogs: BlogDataListInterface | null;
  currentBlogs: BlogDataListInterface | null;
  validationErrors: BackendErrorsInterface | null;
}
