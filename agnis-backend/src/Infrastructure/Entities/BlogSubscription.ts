import { Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { User } from './User';
import { Blog } from './Blog';

@Unique('index_subscriptions', ['user', 'blog'])
@Entity()
export class BlogSubscription {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, { nullable: false })
  user!: User;

  @ManyToOne(() => Blog, (blog) => blog)
  blog!: Blog;
}
