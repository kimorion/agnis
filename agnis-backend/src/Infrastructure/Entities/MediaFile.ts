import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MediaFile {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('time with time zone', { nullable: false })
  createdAt!: Date;

  @Column({ nullable: true })
  name?: string;
}
