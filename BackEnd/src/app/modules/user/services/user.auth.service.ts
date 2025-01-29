import { UserService } from './user.service';
import { UserMapper } from '../mapper/user.mapper';
import { User } from '../domain/models/user';
import { sessionService } from '../../../shared/diContainer/diContainer';
import { error } from 'console';

export class UserAuthService {
  constructor(private userService: UserService, private userMapper: UserMapper) {}

  async checkUserByEmail(profileEmail: string): Promise<User | null> {
    const user: User = await this.userService.findUserByEmail(profileEmail);
    if (user) {
      return user;
    }
    return null;
  }

  async createSession(user: User): Promise<string | null> {
    if (user.blocked) {
      throw error('User is bloked');
    }
    const sessionCookie: string = await sessionService.createSession(user);
    return sessionCookie;
  }
}
