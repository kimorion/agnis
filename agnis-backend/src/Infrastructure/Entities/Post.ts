import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  content?: string;

  @Column('uuid')
  blogId!: string;

  @Column('varchar', { length: 20, array: true })
  tags?: string[];
}
