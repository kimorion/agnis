import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { length: 50, nullable: false, unique: true })
  login!: string;

  @Column('varchar', { length: 100, nullable: true })
  firstName!: string;

  @Column('varchar', { length: 100, nullable: true })
  lastName!: string;

  @Column('date', { nullable: true })
  birthDate?: Date;

  @Column('varchar', { length: 200, nullable: true })
  bio?: string;
}
