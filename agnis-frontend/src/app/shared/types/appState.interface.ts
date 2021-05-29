import { AuthStateInterface } from '../../auth/types/authState.interface';
import { BaseStateInterface } from './baseState.interface';
import { BlogStateInterface } from '../../blog/types/blogState.interface';

export interface AppStateInterface {
  auth: AuthStateInterface;
  base: BaseStateInterface;
  blog: BlogStateInterface;
}
