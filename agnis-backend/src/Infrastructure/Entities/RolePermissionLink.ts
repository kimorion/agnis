import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RolePermissionLink {
  @PrimaryGeneratedColumn('uuid')
  roleId!: string;

  @Column('uuid')
  permissionId!: string;
}
