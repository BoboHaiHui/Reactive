import { ValidationCodeType } from './validation-codes.enum';

export interface IValidationCodes {
  userId: number;
  code: string;
  type: ValidationCodeType;
  created_at?: Date;
  expires_at?: Date;
  expires_after: number;
  used?: boolean;
}
