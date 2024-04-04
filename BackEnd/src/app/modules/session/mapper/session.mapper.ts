import { BaseMapper } from '../../../shared/mapper/base.mapper';
import { IDBConnection } from '../../../shared/services/DB/DBConnection.interface';
import logger from '../../../shared/services/logger/logger.service';
import { Session } from '../domain/models/session';

export class SessionMapper extends BaseMapper< Session >{
  constructor(protected dbConnection: IDBConnection) {
    super(dbConnection);
  }
  async createSession(sessionData:Session): Promise<void>{
    let connection = await this.pool.getConnection();
    try {
      const sql = "INSERT INTO sessions SET ?";
      const inserts = [sessionData];
      const query = this.pool.format(sql, inserts);
      const [rows, fields] = await connection.execute(query);
      logger.debug('Inserted row:', rows);
      connection.release();
    } catch(error){
      logger.critical(error, {description:'session.mapper --> create session error', securityFlag:false, severity:7})
      throw error;
    }
  }
}