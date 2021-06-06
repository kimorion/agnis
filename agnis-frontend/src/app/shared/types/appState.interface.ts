import { AuthStateInterface } from '../../auth/types/authState.interface';
import { BaseStateInterface } from './baseState.interface';
import { BlogStateInterface } from '../../blog/types/blogState.interface';
import { PostStateInterface } from '../../feed/types/postState.interface';
import { UserStateInterface } from '../../user/types/userState.interface';

export interface AppStateInterface {
  auth: AuthStateInterface;
  blog: BlogStateInterface;
  base: BaseStateInterface;
  post: PostStateInterface;
  user: UserStateInterface;
}
