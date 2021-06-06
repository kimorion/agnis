import { UserDataInterface } from '../../shared/types/userData.interface';
import { PostDataInterface } from '../../feed/types/postData.interface';

export interface BlogDataInterface {
  id: string;
  name: string;
  description: string;
  isSubscribed: boolean;
  user: UserDataInterface;
  posts: PostDataInterface[];
}
