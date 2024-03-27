import mysql from 'mysql2/promise'; // Import the mysql package

import { IDBConnection } from './iDB-connection.service';

export class MYSQL implements IDBConnection {
  private pool: mysql.Pool;

  constructor(){
    this.pool = mysql.createPool({
      connectionLimit: 10,
      host: 'mysql',
      user: 'myuser',
      password: 'mypassword',
      database: 'mydatabase'
    });
  }

  public async connect(): Promise<mysql.Pool> {
    return this.pool;
  }

  public async stop(): Promise<void> {
    await this.pool.end();
  }
}