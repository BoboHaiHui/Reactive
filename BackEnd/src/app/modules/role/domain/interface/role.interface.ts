import { Permissions } from './permissions.enum';
import { RoleType } from './role.enums';

export interface IRole {
  type: RoleType;
  description: string;
  permissions: Permissions[];
}
