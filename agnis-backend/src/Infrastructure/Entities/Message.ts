import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  content?: string;

  @Column('uuid')
  fromUserId!: string;

  @Column('uuid')
  toUserId!: string;
}
