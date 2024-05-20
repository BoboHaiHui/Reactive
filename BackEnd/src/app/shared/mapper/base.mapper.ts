import mysql from 'mysql2/promise'; // Import the mysql package

import { IDBConnection } from '../services/DB/DBConnection.interface';
import logger from '../services/logger/logger.service';
import { IBaseMapper } from './base.mapper.interface';

export class BaseMapper<TModel> implements IBaseMapper<TModel> {
  protected model: any;
  protected dbConnection: IDBConnection;
  protected pool: mysql.Pool;

  constructor(dbConnection: IDBConnection) {
    this.dbConnection = dbConnection;
    this.initializePool();
  }

  private async initializePool() {
    this.pool = await this.dbConnection.connect();
  }

  async create(tableName: string, model: TModel): Promise<TModel> {
    let connection;
    try {
      connection = await this.pool.getConnection();
      const sql = 'INSERT INTO ?? SET ?';
      const inserts = [tableName, model];
      const query = this.pool.format(sql, inserts);
      const [rows, fields] = await connection.execute(query);
      logger.debug('Inserted row:', rows);
      return model;
    } catch (error) {
      logger.critical(error, { description: 'base.mapper --> create error', securityFlag: false, severity: 7 });
      throw error;
    } finally {
      connection.release();
    }
  }

  async retrieve(tableName: string, field: string, value: any): Promise<TModel[]> {
    let connection;
    try {
      connection = await this.pool.getConnection();
      const sql = 'SELECT * FROM ?? WHERE ?? = ? ';
      const inserts = [tableName, field, value];
      const query = this.pool.format(sql, inserts);
      const [rows, fields] = await connection.execute(query);

      return rows;
    } catch (error) {
      logger.critical(error, { description: 'base.mapper-retrieveAll error', securityFlag: false, severity: 5 });
      throw error;
    } finally {
      connection.release();
    }
  }

  async retrieveAll(tableName: string): Promise<TModel[]> {
    let connection;
    try {
      connection = await this.pool.getConnection();
      const sql = 'SELECT * FROM ?? ';
      const inserts = [tableName];
      const query = this.pool.format(sql, inserts);
      const [rows, fields] = await connection.execute(query);

      return rows;
    } catch (error) {
      logger.critical(error, { description: 'base.mapper-retrieveAll error', securityFlag: false, severity: 5 });
      throw error;
    } finally {
      connection.release();
    }
  }

  async retrieveOne(tableName: string, field: string, value: any): Promise<TModel> {
    let connection;
    try {
      connection = await this.pool.getConnection();
      const sql = 'SELECT * FROM ?? WHERE ?? = ? LIMIT 1';
      const inserts = [tableName, field, value];
      const query = this.pool.format(sql, inserts);
      const [rows, fields] = await connection.execute(query);
      return rows;
    } catch (error) {
      logger.critical(error, { description: 'base.mapper-retrieveAll error', securityFlag: false, severity: 5 });
      throw error;
    } finally {
      connection.release();
    }
  }

  async update(tableName: string, model: any, field: string, value: any): Promise<TModel> {
    let connection;
    try {
      connection = await this.pool.getConnection();
      const sql = 'UPDATE ?? SET ? WHERE ??=? ';
      const inserts = [tableName, model, field, value];
      const query = this.pool.format(sql, inserts);
      const [rows, fields] = await connection.execute(query);
      logger.debug('Inserted row:', rows);

      return model;
    } catch (error) {
      logger.critical(error, { description: 'base.mapper-update error', securityFlag: false, severity: 7 });
      throw error;
    } finally {
      connection.release();
    }
  }

  async delete(tableName: string, field: string, value: string | number): Promise<boolean> {
    let connection;
    try {
      connection = await this.pool.getConnection();
      const sql = 'DELETE FROM ?? WHERE ??=? ';
      const inserts = [tableName, field, value];
      const query = this.pool.format(sql, inserts);
      const [rows, fields] = await connection.execute(query);
      logger.debug(`${field} ${value} from ${tableName} was deleted `, rows);
      return true;
    } catch (error) {
      logger.critical(error, { description: 'base.mapper-delete error', securityFlag: false, severity: 7 });
      throw error;
    } finally {
      connection.release();
    }
  }
}
