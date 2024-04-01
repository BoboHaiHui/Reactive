
import { BaseMapper } from '../../../shared/mapper/base.mapper';
import { IDBConnection } from '../../../shared/services/DB/DBConnection.interface';
import { Role } from '../domain/model/role';

export class RoleMapper extends BaseMapper< Role >{
  constructor(protected connection: IDBConnection) {
    super(connection);
  }

  async createRole(tableName:string, roleData: Role): Promise<Role>{
    return await this.create(tableName, roleData) as Role;
  }
}