import mysql from 'mysql2/promise'; // Import the mysql package

import { IDBConnection } from '../services/DB/DBConnection.interface';
import logger from '../services/logger/logger.service';
import { IBaseMapper } from './base.mapper.interface';

export class BaseMapper<TModel> implements IBaseMapper<TModel> {
  protected model: any;
  protected dbConnection: IDBConnection;
  protected pool: mysql.Pool;

  constructor(dbConnection: IDBConnection){
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

      const sql = "INSERT INTO ?? SET ?"
      const inserts = [tableName, model];
      const query = this.pool.format(sql, inserts);
      const [rows, fields] = await connection.execute(query);
      logger.debug('Inserted row:', rows);
      connection.release();
      return model;
    } catch (error) {
      logger.critical(error, {description:'base.mapper-create error', securityFlag:false, severity:7})
      throw error;
    }
  };

  retrieve(criteria: any): Promise<TModel[]> {
    throw new Error('Method not implemented.');
  }

  async retrieveAll(tableName: string): Promise<TModel[]> {
    let connection;
    try {
      connection = await this.pool.getConnection();
      const sql = "SELECT * FROM ?? ";
      const inserts = [tableName];
      const query = this.pool.format(sql, inserts);
      const [rows, fields] = await connection.execute(query);
      console.log('RetrieveAll data:', rows);
      connection.release();
      return rows;
    } catch (error) {
      logger.critical(error, {description:'base.mapper-retrieveAll error', securityFlag:false, severity:5})
      throw error;
    }
  };

  //de implementat
  async retrieveOne(tableName:string, filter: any): Promise<TModel> {
    let connection;
    try {
      connection = await this.pool.getConnection();
      const sql = "SELECT * FROM ?? WHERE ?? = ? ";
      const inserts = [tableName];
      const query = this.pool.format(sql, inserts);

      const [rows, fields] = await connection.execute(query);

      console.log('RetrieveAll data:', rows);
      connection.release();
      return rows;
    } catch (error) {
      logger.critical(error, {description:'base.mapper-retrieveAll error', securityFlag:false, severity:5})
      throw error;
    }
  }

  update(model: TModel): Promise<TModel> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}