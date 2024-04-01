import { Role } from '../domain/model/role';
import { RoleMapper } from '../mapper/role.mapper';

export class RoleService {
  constructor( private roleMapper: RoleMapper)
  {}

  async createRole(tableName: string, roleData: Role): Promise<Role>{
    return this.roleMapper.createRole(tableName, roleData);
  }
}