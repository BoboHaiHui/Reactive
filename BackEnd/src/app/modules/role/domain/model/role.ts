import { Permissions } from '../interface/permissions.enum';
import { RoleType } from '../interface/role.enums';
import { IRole } from '../interface/role.interface';

export class Role implements IRole {
  id?: number;
  type: RoleType;
  description: string;
  permissions: Permissions[];
}
