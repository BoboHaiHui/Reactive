import { User } from '../../user/domain/models/user';
import { IFullProfileUserData } from '../domain/interfaces/admin.interfaces';
import { AdminMapper } from '../mapper/admin.mapper';

export class AdminService {
  constructor(private adminMapper: AdminMapper) {}

  async retrieveAll(tableName: string): Promise<IFullProfileUserData[]> {
    let rawAllUsers: User[] = await this.adminMapper.retrieveAll(tableName);

    // Map each user object and create a new object without the 'password' and 'activationCode' properties
    const sanitizedUsers: IFullProfileUserData[] = rawAllUsers.map(user => {
      const { password, activation_code, ...sanitizedUser } = user;
      return sanitizedUser;
    });

    return sanitizedUsers;
  }

  async retrieveOne(tableName: string, field: string, value: string | number): Promise<User> {
    return (await this.adminMapper.retrieveOne(tableName, field, value)) as any;
  }
}
