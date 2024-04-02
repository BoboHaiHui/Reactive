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

  async register (tableName:string, userData: User): Promise<boolean>{
    let userRegistred: User;
    userRegistred = await this.create(tableName, userData);
    console.log('userRegistred', userRegistred)
    if (userRegistred){
      return true;
    } else {
      return false;
    }
  }
}