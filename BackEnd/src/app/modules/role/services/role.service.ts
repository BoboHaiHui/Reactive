import logger from '../../../shared/services/logger/logger.service';
import { Role } from '../domain/model/role';
import { RoleMapper } from '../mapper/role.mapper';

export class RoleService {
  private tableName: string = 'roles';

  constructor( private roleMapper: RoleMapper)
  {}

  async createRole(rawUserData: Role): Promise<string>{
    const roleData: Role = rawUserData;
    //add logic and validation
    return this.roleMapper.createRole(this.tableName, roleData);
  }

  async retrieveRoleById(rawRoleData: any): Promise<Role> {
    if (typeof rawRoleData.id !== 'number' || !Number.isInteger(rawRoleData.id)) { return null }
    const idNumber: number = rawRoleData.id;
    const field:string = 'id';
    try{
        return await this.roleMapper.retrieveOne(this.tableName, field, idNumber);
      }
    catch(error){
      logger.debug('role.service -> retrieveRoleById error', error);
      throw error;
    }
  }
}