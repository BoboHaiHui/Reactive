import { IUser } from '../interface/user.interface';

export class User implements IUser {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId: number;
  blocked: boolean;
  password_attempt?: number;
}
