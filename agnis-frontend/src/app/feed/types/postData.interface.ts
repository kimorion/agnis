import { BlogDataInterface } from '../../blog/types/blogData.interface';

export interface PostDataInterface {
  id: string;
  title: string;
  content: string;
  blog: BlogDataInterface;
  creationDate: Date;
}
