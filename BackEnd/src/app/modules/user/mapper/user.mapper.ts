import { BaseMapper } from '../../../shared/mapper/base.mapper';
import { IDBConnection } from '../../../shared/services/DB/DBConnection.interface';
import { User } from '../domain/models/user';

export class UserMapper extends BaseMapper< User >{
  constructor(protected connection: IDBConnection) {
    super(connection);
  }

  async retrieveAll(tableName:string): Promise<User[]>{
    return await super.retrieveAll(tableName) as User[];
  }
}