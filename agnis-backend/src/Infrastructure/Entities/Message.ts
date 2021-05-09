import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text', { nullable: false })
  content!: string;

  @ManyToOne(() => User, { nullable: false })
  fromUser!: User;

  @ManyToOne(() => User, { nullable: false })
  toUser!: User;
}
