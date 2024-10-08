import { BaseMapper } from '../../../shared/mapper/base.mapper';
import { IDBConnection } from '../../../shared/services/DB/DBConnection.interface';
import logger from '../../../shared/services/logger/logger.service';
import { ValidationCodes } from '../domain/model/validation-codes';

export class ValidationCodesMapper extends BaseMapper<ValidationCodes> {
  constructor(protected dbConnection: IDBConnection) {
    super(dbConnection);
  }
  private tableName = 'user_validation_codes';

  async createValidationCode(data: ValidationCodes): Promise<boolean> {
    //needs UPDATE not INSERT
    console.log('CODES DATA', data);
    const sql =
      'UPDATE ?? SET code = ?, type = ?, expires_at = NOW() + INTERVAL ? MINUTE, created_at = NOW(), used = 0, code_attempts = 0 WHERE userId = ?';
    const inserts = [this.tableName, data.code, data.type, data.expires_after, data.userId];
    let connection;
    try {
      connection = await this.pool.getConnection();
      const query = this.pool.format(sql, inserts);
      const [rows] = await connection.execute(query);
      logger.debug('Validation Code created:', rows);
      return true;
    } catch (error) {
      logger.critical(error, { description: 'validation-code.mapper-create validation code error', securityFlag: false, severity: 7 });
      return false;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  async createActivateAccountCode(data: ValidationCodes): Promise<boolean> {
    const sql = 'INSERT INTO ?? (userId, code, type, expires_at) VALUES (?,?,?, NOW() + INTERVAL ? MINUTE)';
    const inserts = [this.tableName, data.userId, data.code, data.type, data.expires_after];
    let connection;
    try {
      connection = await this.pool.getConnection();
      const query = this.pool.format(sql, inserts);
      const [rows] = await connection.execute(query);
      logger.debug('Validation Code created:', rows);
      connection.release();
      return true;
    } catch (error) {
      logger.critical(error, { description: 'validation-code.mapper-create validation code error', securityFlag: false, severity: 7 });
      return false;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  async getCodeData(userId: number): Promise<string | null> {
    const field = 'userId';
    let validation_codes: ValidationCodes;
    try {
      validation_codes = await this.retrieveOne(this.tableName, field, userId);
      if (validation_codes) {
        return validation_codes[0];
      } else {
        return null;
      }
    } catch (error) {
      logger.debug('getCodeData mapper error');
      throw error;
    }
  }

  async markAsUsed(userId: number): Promise<boolean> {
    const field = 'userId';
    const model = {
      used: true
    };
    try {
      const response = await this.update(this.tableName, model, field, userId);
      if (response) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      logger.debug('MarkAsUsed activation code error');
      throw error;
    }
  }
}
