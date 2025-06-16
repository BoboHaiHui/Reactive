import config from '../../../../config';
import { generateRandomBytes } from '../../../shared/utils/randomBytes';
import { utils } from '../../../shared/utils/validations';
import { ValidationCodeType } from '../domain/interface/validation-codes.enum';
import { ValidationCodes } from '../domain/model/validation-codes';
import { ValidationCodesMapper } from '../mapper/validation-codes.mapper';

export class ValidationCodeService {
  constructor(private validationCodesMaper: ValidationCodesMapper) {}

  async generateRandomCode(codeLength: number): Promise<string> {
    return await generateRandomBytes(codeLength);
  }

  async updateAccountCode(userId: number, codeType: ValidationCodeType, codeTTL: number): Promise<string | null> {
    const data: ValidationCodes = {
      userId: userId,
      code: await this.generateRandomCode(config.validation_codes.codeLength),
      type: codeType,
      expires_after: codeTTL
    };
    const isValudateCodeCreated = await this.validationCodesMaper.updateValidationCode(data);
    if (isValudateCodeCreated) {
      return data.code;
    }
    return null;
  }

  async createValidationAccountCode(userId: number, codeType: ValidationCodeType, codeTTL: number): Promise<string | null> {
    const data: ValidationCodes = {
      userId: userId,
      code: await this.generateRandomCode(config.validation_codes.codeLength),
      type: codeType,
      expires_after: codeTTL
    };
    const isValudateCodeCreated = await this.validationCodesMaper.createValidationAccountCode(data);
    if (isValudateCodeCreated) {
      return data.code;
    }
    return null;
  }

  async getCodeData(userId: number): Promise<any> {
    const activateAccountData = await this.validationCodesMaper.getCodeData(userId);
    return activateAccountData;
  }

  async markAsUsed(userId: number): Promise<boolean> {
    const markasUsed = await this.validationCodesMaper.markAsUsed(userId);
    if (markasUsed) {
      return true;
    } else {
      return false;
    }
  }

  async isCodeValid(userId: number, rawActivationCode: string): Promise<boolean> {
    const codeData: ValidationCodes = await this.getCodeData(userId);
    const isCodeMatch = codeData.code === rawActivationCode;
    const isCodeExpired = utils.isCodeExpired(codeData.expires_at);
    const isCodeValid = isCodeMatch && !isCodeExpired && codeData.code != null && !codeData.used;
    if (!isCodeValid) {
      await this.increaseCodeAttempts(codeData.userId, codeData.code_attempts);
    }
    return isCodeValid;
  }

  async increaseCodeAttempts(userId: number, code_attempts: number) {
    await this.validationCodesMaper.increaseCodeAttempts(userId, code_attempts);
  }
}
