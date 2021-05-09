import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Blog } from './Blog';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text', { nullable: false })
  content!: string;

  @ManyToOne(() => Blog, { nullable: false })
  blog!: Blog;

  @Column('varchar', { length: 20, array: true, nullable: true })
  tags?: string[];
}
