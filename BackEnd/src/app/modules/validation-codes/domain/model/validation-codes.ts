import { ValidationCodeType } from '../interface/validation-codes.enum';
import { IValidationCodes } from '../interface/validation-codes.interface';

export class ValidationCodes implements IValidationCodes {
  id?: number;
  userId: number;
  code: string;
  type: ValidationCodeType;
  created_at?: Date;
  expires_at?: Date;
  expires_after: number;
  used?: boolean;
}
