import { BaseService } from '../../../shared/services/base.service';
import { User } from '../domain/models/user';
import { UserMapper } from '../mapper/user.mapper';

export class UserService extends BaseService< User >{
  constructor( private userMapper: UserMapper)
  {
    super(userMapper)
  }

 async register():Promise<User>{
    return
  }
}