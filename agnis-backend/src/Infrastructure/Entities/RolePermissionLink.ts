import { Entity, ManyToOne } from 'typeorm';
import { Permission } from './Permission';
import { Role } from './Role';

@Entity()
export class RolePermissionLink {
  @ManyToOne(() => Role, { primary: true, nullable: false })
  role!: Role;

  @ManyToOne(() => Permission, { primary: true, nullable: false })
  permission!: Permission;
}
