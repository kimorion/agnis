import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { length: 100, nullable: false })
  firstName!: string;

  @Column('varchar', { length: 100, nullable: false })
  lastName!: string;

  @Column('date', { nullable: true })
  birthDate?: Date;

  @Column('varchar', { length: 200, nullable: true })
  bio?: string;
}
