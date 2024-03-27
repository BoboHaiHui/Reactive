import { IUser } from '../interface/iUser';
import { Role } from './role';

export class User implements IUser{
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
  blocked: Boolean;
  activation_code: string;
}