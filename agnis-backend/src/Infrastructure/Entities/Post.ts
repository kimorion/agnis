import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Blog } from './Blog';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text', { nullable: false })
  title!: string;

  @Column('text', { nullable: false })
  content!: string;

  @Column('timestamp with time zone', { nullable: false })
  creationDate!: Date;

  @ManyToOne(() => Blog, { nullable: false })
  blog!: Blog;

  @Column('varchar', { length: 20, array: true, nullable: true })
  tags?: string[];
}
