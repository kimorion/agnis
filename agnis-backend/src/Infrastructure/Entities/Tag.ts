import { Column, Entity } from 'typeorm';

@Entity()
export class Tag {
  @Column()
  id!: string;

  @Column()
  name!: string;
}
