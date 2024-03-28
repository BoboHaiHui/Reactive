import { BaseMapper } from '../../../shared/mapper/base.mapper';
import { IDBConnection } from '../../../shared/services/DB/DBConnection.interface';
import { IUser } from '../domain/interface/user.interface';

export class UserMapper extends BaseMapper< IUser >{
  constructor(protected connection: IDBConnection) {
    super(connection);
  }

  async retrieveAll(tableName:string): Promise<IUser[]>{
    return await super.retrieveAll(tableName);
  }
}