import mysql from 'mysql2/promise'; // Import the mysql package

import { IDBConnection } from '../services/DB/iDB-connection.service';
import { IBaseMapper } from './iBase.mapper';

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

      console.log('Inserted row:', rows);
      connection.release();
      return model;
    } catch (error) {
      console.error('Error inserting user:', error);
      throw error;
    }
  };

  retrieve(criteria: any): Promise<TModel[]> {
    throw new Error('Method not implemented.');
  }

  retrieveAll(tableName: string): Promise<TModel[]> {
    throw new Error('Method not implemented.');
  }

  retrieveOne(filter: any): Promise<TModel> {
    throw new Error('Method not implemented.');
  }

  update(model: TModel): Promise<TModel> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

}