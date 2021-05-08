import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MediaFile {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('time with time zone')
  createdAt!: Date;

  @Column()
  name?: string;
}
