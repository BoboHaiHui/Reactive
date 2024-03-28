import mysql from 'mysql2/promise'; // Import the mysql package

import config from '../../../../config';
import logger from '../logger/logger.service';
import { IDBConnection } from './DBConnection.interface';

export class MYSQL implements IDBConnection {
  private pool: mysql.Pool;

  constructor(){
    this.pool = mysql.createPool({
      connectionLimit: config.dataBase.connectionLimit,
      host: config.dataBase.host,
      user: config.dataBase.user,
      password: config.dataBase.password,
      database: config.dataBase.database
    });
  }

  public async connect(): Promise<mysql.Pool> {
    try{
      return this.pool;
    } catch (error){
      logger.error(error, {description:'Server is faild to start', securityFlag:true, severity:7});
    }
  }

  public async stop(): Promise<void> {
    await this.pool.end();
  }
}