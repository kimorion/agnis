import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { Post } from './Post';
import { BlogSubscription } from './BlogSubscription';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, { nullable: false })
  user!: User;

  @OneToMany(() => Post, (post) => post.blog)
  posts!: Post[];

  @Column('varchar', { length: 200, nullable: true, unique: true })
  name?: string;

  @Column('varchar', { length: 400, nullable: true })
  description?: string;

  @OneToMany(() => BlogSubscription, (sub) => sub.blog)
  subscriptions!: BlogSubscription[];
}
