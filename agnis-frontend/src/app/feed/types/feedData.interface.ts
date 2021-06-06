import { PostDataInterface } from './postData.interface';

export interface FeedDataInterface {
  items: PostDataInterface[];
  count: number;
}
