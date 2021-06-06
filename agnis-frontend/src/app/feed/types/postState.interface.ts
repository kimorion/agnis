import { PostDataInterface } from './postData.interface';
import { BackendErrorsInterface } from '../../shared/types/backendErrors.interface';
import { FeedDataInterface } from './feedData.interface';

export interface PostStateInterface {
  isLoading: boolean;
  isSubmitting: boolean;
  activePost: PostDataInterface | null;
  feedPosts: FeedDataInterface | null;
  submittingErrors: BackendErrorsInterface | null;
}
