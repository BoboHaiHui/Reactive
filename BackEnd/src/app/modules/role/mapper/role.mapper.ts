import { BaseMapper } from '../../../shared/mapper/base.mapper';
import { IDBConnection } from '../../../shared/services/DB/DBConnection.interface';
import logger from '../../../shared/services/logger/logger.service';
import { Role } from '../domain/model/role';

export class RoleMapper extends BaseMapper<Role> {
  constructor(protected dbConnection: IDBConnection) {
    super(dbConnection);
  }

  async createRole(tableName: string, roleData: Role): Promise<string> {
    const sql = 'INSERT INTO ?? (type, description, permissions) VALUES (?, ?, ?)';
    const permissionsFormated = JSON.stringify(roleData.permissions);
    const inserts = [tableName, roleData.type, roleData.description, permissionsFormated];
    try {
      let connection = await this.pool.getConnection();
      const query = this.pool.format(sql, inserts);
      const [rows] = await connection.execute(query);
      logger.debug('Inserted role:', rows);
      connection.release();
      return 'Role created';
    } catch (error) {
      logger.critical(error, { description: 'role.mapper-create role error', securityFlag: false, severity: 7 });
      throw error;
    }
  }

  async retrieveRoleById(tableName: string, field: string, value: any): Promise<Role> {
    return await this.retrieveOne(tableName, field, value);
  }
}
