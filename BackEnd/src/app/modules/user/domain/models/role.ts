import { IRole } from '../interface/iRole';
import { Permissions } from '../interface/permissions.enum';
import { RoleType } from '../interface/role.enums';

export class Role implements IRole{
  type: RoleType;
  description: string;
  permissions: Permissions[];
  default: boolean;
}