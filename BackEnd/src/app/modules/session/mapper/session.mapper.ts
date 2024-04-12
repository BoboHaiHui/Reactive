import { BaseMapper } from '../../../shared/mapper/base.mapper';
import { IDBConnection } from '../../../shared/services/DB/DBConnection.interface';
import logger from '../../../shared/services/logger/logger.service';
import { Session } from '../domain/models/session';
import { SessionDataRequest } from '../domain/models/sessionDataRequest';

export class SessionMapper extends BaseMapper<Session> {
  constructor(protected dbConnection: IDBConnection) {
    super(dbConnection);
  }
  async createSession(sessionData: Session): Promise<void> {
    let connection = await this.pool.getConnection();
    try {
      const sql = 'INSERT INTO sessions SET ?';
      const inserts = [sessionData];
      const query = this.pool.format(sql, inserts);
      const [rows, fields] = await connection.execute(query);
      logger.debug('Inserted row:', rows);
    } catch (error) {
      logger.critical(error, { description: 'session.mapper --> create session error', securityFlag: false, severity: 7 });
      throw error;
    } finally {
      connection.release();
    }
  }

  async deleteSession(sessionId: string) {
    let connection = await this.pool.getConnection();
    try {
      const sql = 'DELETE FROM sessions WHERE sessionId=?';
      const inserts = [sessionId];
      const query = this.pool.format(sql, inserts);
      const [rows, fields] = await connection.execute(query);
      logger.debug('Inserted row:', rows);
    } catch (error) {
      logger.critical(error, { description: 'session.mapper --> delete session error', securityFlag: false, severity: 7 });
      throw error;
    } finally {
      connection.release();
    }
  }

  async retrieveSessionData(sessionId: string): Promise<any> {
    const tableName = 'sessions';
    const columnName = 'sessionId';
    let sessionData: SessionDataRequest = {
      sessionId: '',
      userId: null,
      sessionExpiration: null,
      idleExpiration: null,
      userRole: null,
      permissions: []
    };

    try {
      sessionData = await this.retrieveOne(tableName, columnName, sessionId);
      sessionData[0].permissions = await this.retrievePermissionByRole(sessionData[0].userRole);
      return sessionData;
    } catch (error) {
      logger.critical(error, { description: 'session.mapper --> retrieve session data error', securityFlag: false, severity: 7 });
      throw error;
    }
  }

  async retrievePermissionByRole(role: number): Promise<string[]> {
    const tableName = 'roles';
    const columnName = 'id';
    try {
      let roleData = await this.retrieveOne(tableName, columnName, role);
      return roleData[0].permissions;
    } catch (error) {
      logger.critical(error, { description: 'session.mapper --> create permissions error', securityFlag: false, severity: 7 });
      throw error;
    }
  }

  async sessionExists(sessionId: string): Promise<boolean> {
    let connection = await this.pool.getConnection();
    try {
      const sql = 'SELECT COUNT(*) AS count FROM sessions WHERE sessionId=?';
      const inserts = [sessionId];
      const query = this.pool.format(sql, inserts);
      const [rows, fields] = await connection.execute(query);
      const count = rows[0]?.count || 0;
      return count > 0;
    } catch (error) {
      throw error;
    } finally {
      connection.release();
    }
  }

  // Obsolete
  // async retrieveSessionIdPermissions(sessionId:string): Promise<[]>{
  //   const sessionIdData:Session = await this.retrieveSessionData(sessionId);
  //   const permissions = await this.retrievePermissionByRole(sessionIdData[0].userRole)

  //   return permissions[0].permissions;
  // }
}
