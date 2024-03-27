import { BaseMapper } from '../../../shared/mapper/base.mapper';
import { IDBConnection } from '../../../shared/services/DB/iDB-connection.service';
import { IUser } from '../domain/interface/iUser';

export class UserMapper extends BaseMapper< IUser >{
  constructor(private connection: IDBConnection) {
    super(connection);
  }
}