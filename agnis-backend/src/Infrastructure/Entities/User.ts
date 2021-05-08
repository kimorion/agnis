import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  firstName?: string;

  @Column()
  lastName?: string;

  @Column('date')
  birthDate?: Date;

  @Column()
  bio?: string;
}
