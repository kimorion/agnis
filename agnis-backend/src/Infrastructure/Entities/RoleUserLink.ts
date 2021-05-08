import { Column, Entity } from 'typeorm';

@Entity()
export class RoleUserLink {
  @Column()
  roleId!: string;

  @Column()
  userId!: string;
}
