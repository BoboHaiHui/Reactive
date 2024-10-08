import { IBaseModel } from '../../../../shared/domain/baseModel.interface';

export interface IUser extends IBaseModel {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId: number;
  blocked: Boolean;
  password_attempt?: number;
}
