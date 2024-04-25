import { BaseMapper } from '../../../shared/mapper/base.mapper';
import { IDBConnection } from '../../../shared/services/DB/DBConnection.interface';
import { User } from '../../user/domain/models/user';

export class AdminMapper extends BaseMapper<any> {
  constructor(protected dbConnectio: IDBConnection) {
    super(dbConnectio);
  }

  async retrieveAll(tableName: string): Promise<User[]> {
    return (await super.retrieveAll(tableName)) as User[];
  }

  async deleteByID(tableName: string, field: string, value: number): Promise<boolean> {
    return await super.delete(tableName, field, value);
  }
}
