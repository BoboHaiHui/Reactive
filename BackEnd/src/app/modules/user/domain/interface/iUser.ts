import { IRole } from './iRole';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: IRole;
  blocked: Boolean;
  activation_code: string;
}