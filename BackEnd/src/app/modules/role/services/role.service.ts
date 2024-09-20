import logger from '../../../shared/services/logger/logger.service';
import { IRole } from '../domain/interface/role.interface';
import { Role } from '../domain/model/role';
import { RoleMapper } from '../mapper/role.mapper';

export class RoleService {
  private tableName: string = 'roles';

  constructor(private roleMapper: RoleMapper) {}

  async createRole(rawUserData: Role): Promise<string> {
    const roleData: Role = rawUserData;
    //add logic and validation
    return this.roleMapper.createRole(this.tableName, roleData);
  }

  async retrieveAllRoles(): Promise<Role[]> {
    let rolesList: Role[] = await this.roleMapper.retrieveAllRoles();
    return rolesList;
  }

  async retrieveRoleById(rawRoleData: any): Promise<Role> {
    if (typeof rawRoleData.id !== 'number' || !Number.isInteger(rawRoleData.id)) {
      return null;
    }
    const idNumber: number = rawRoleData.id;
    const field: string = 'id';
    try {
      return await this.roleMapper.retrieveOne(this.tableName, field, idNumber);
    } catch (error) {
      logger.debug('role.service -> retrieveRoleById error', error);
      throw error;
    }
  }

  async updateRoleByType(updateRoleData: IRole): Promise<boolean> {
    try {
      let updateRoleDataResponse = await this.roleMapper.updateRoleByType(updateRoleData);
      if (updateRoleDataResponse) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      logger.debug('Update Role error: ', error);
      throw error();
    }
  }

  async deleteRole(typeValue: string): Promise<boolean> {
    try {
      let deleteRoleResponse = await this.roleMapper.deleteRole(typeValue);
      if (deleteRoleResponse) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      logger.debug('Delete role error', error);
      throw error();
    }
  }
}
