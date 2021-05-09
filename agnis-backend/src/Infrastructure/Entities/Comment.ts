import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { Post } from './Post';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, { nullable: false })
  user!: User;

  @ManyToOne(() => Post, { nullable: false })
  post!: Post;

  @Column('varchar', { length: 20, nullable: false })
  evaluation!: Evaluation;
}

enum Evaluation {
  Negative,
  Neutral,
  Positive,
}
