import { BaseService } from '../../../shared/services/base.service';
import { User } from '../domain/models/user';
import { UserMapper } from '../mapper/user.mapper';

export class UserService {
  constructor( private userMapper: UserMapper)
  {}

 async register(tableName: string, userModel: User):Promise<User>{
    return this.userMapper.create(tableName, userModel) as any;
  }

  async retrieveAll(tableName: string):Promise<User[]>{
    return this.userMapper.retrieveAll(tableName);
  }

  async retrieveOne(tableName: string, field: string, value: string | number): Promise<User> {
    return this.userMapper.retrieveOne(tableName, field, value) as any;
  }

  async update(tableName: string, userData: User, field: string, value: string|number): Promise<User> {
    return this.userMapper.update(tableName, userData, field, value);
  }
}