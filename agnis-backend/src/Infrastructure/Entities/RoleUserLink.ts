import { Entity, ManyToOne } from 'typeorm';
import { Role } from './Role';
import { User } from './User';

@Entity()
export class RoleUserLink {
  @ManyToOne(() => Role, { primary: true, nullable: false })
  role!: Role;

  @ManyToOne(() => User, { primary: true, nullable: false })
  user!: User;
}
