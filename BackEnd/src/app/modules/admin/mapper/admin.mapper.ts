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

  async editUserByID(editUserData): Promise<boolean> {
    const tableName = 'users';
    const model = { roleId: editUserData.roleId, blocked: editUserData.blocked };
    const field = 'id';
    const value = editUserData.id;
    const response = await super.update(tableName, model, field, value);
    if (response) {
      return true;
    } else {
      return false;
    }
  }
}
