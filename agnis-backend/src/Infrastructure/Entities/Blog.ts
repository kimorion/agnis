import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, { nullable: false })
  user!: User;

  @Column('varchar', { length: 200, nullable: true, unique: true })
  name?: string;

  @Column('varchar', { length: 400, nullable: true })
  description?: string;
}
