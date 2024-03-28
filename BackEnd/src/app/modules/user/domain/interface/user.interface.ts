import { IRole } from './role.interface';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: IRole;
  blocked: Boolean;
  activation_code: string;
}