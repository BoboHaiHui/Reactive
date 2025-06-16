import bcrypt from 'bcryptjs';
import config from '../../../../config';
import { emailService, sessionService, validationCodesService } from '../../../shared/diContainer/diContainer';
import logger from '../../../shared/services/logger/logger.service';
import { utils } from '../../../shared/utils/validations';
import {
  ILoginInput,
  IRegisterInput,
  IResetPassword,
  IResponceMessage,
  IUpdateProfileInput,
  IUserProfileData
} from '../domain/interface/input/userRegisterInput.interface';
import { User } from '../domain/models/user';
import { UserMapper } from '../mapper/user.mapper';
import { ValidationCodeType } from '../../validation-codes/domain/interface/validation-codes.enum';
import { IValidationCodes } from '../../validation-codes/domain/interface/validation-codes.interface';

export class UserService {
  private responseMessage: IResponceMessage | IUserProfileData;

  constructor(private userMapper: UserMapper) {}

  async register(rawRegisterData: IRegisterInput): Promise<IResponceMessage> {
    const tableName = 'users';
    let registerData: User = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      roleId: config.user.defaultUserId,
      blocked: config.user.blocked
    };
    let emailInUse: boolean;

    if (!(rawRegisterData.firstName && rawRegisterData.lastName && rawRegisterData.email && rawRegisterData.password)) {
      this.responseMessage = { statusText: 'fail', data: 'All fileds are mandatory' };
      return this.responseMessage;
    }
    if (!rawRegisterData.terms) {
      this.responseMessage = { statusText: 'fail', data: 'Please agree our terms and conditions' };
      return this.responseMessage;
    }
    if (rawRegisterData.firstName.length > 20 || rawRegisterData.lastName.length > 20) {
      this.responseMessage = { statusText: 'fail', data: 'Max number of characters is 20' };
      return this.responseMessage;
    }
    if (!utils.passwordValidator(rawRegisterData.password)) {
      this.responseMessage = { statusText: 'fail', data: 'Password not strong enough' };
      return this.responseMessage;
    }
    if (!utils.emailValidator(rawRegisterData.email)) {
      this.responseMessage = { statusText: 'fail', data: 'Not a valid email address' };
      return this.responseMessage;
    }

    emailInUse = await this.checkEmailExistance(rawRegisterData.email);
    if (emailInUse) {
      this.responseMessage = { statusText: 'fail', data: 'E-mail already in use' };
      return this.responseMessage;
    }

    try {
      registerData.firstName = rawRegisterData.firstName;
      registerData.lastName = rawRegisterData.lastName;
      registerData.email = rawRegisterData.email;

      registerData.password = await bcrypt.hash(rawRegisterData.password + config.user.password_sufix, 10);
      const userID = await this.userMapper.register(tableName, registerData);
      const activateAccountCode = await validationCodesService.createValidationAccountCode(
        userID,
        ValidationCodeType.activateAccount,
        config.validation_codes.activateAccountCodeTTL
      );
      if (userID && activateAccountCode) {
        await emailService.sendMail(registerData.email, 'Activate Reactive Account', 'activate_account', [
          activateAccountCode,
          registerData.email
        ]);
        this.responseMessage = { statusText: 'success', data: 'User was created. Please access the email to activate account' };
        return this.responseMessage;
      } else {
        this.responseMessage = { statusText: 'fail', data: null };
        return this.responseMessage;
      }
    } catch (error) {
      logger.debug('user.service --> register error', error);
    }
  }

  async activateAccount(user_email: string, activation_code: string): Promise<IResponceMessage> {
    try {
      const userId: number = await this.userMapper.getUserIdByEmail(user_email);
      const isCodeValid = await validationCodesService.isCodeValid(userId, activation_code);
      if (isCodeValid) {
        const response = await this.userMapper.activateAccount(user_email);
        if (response) {
          this.responseMessage = { statusText: 'success', data: 'Account was activated' };
          await validationCodesService.markAsUsed(userId);
          return this.responseMessage;
        }
        this.responseMessage = { statusText: 'fail', data: 'Account was not activated' };
        return this.responseMessage;
      }
      this.responseMessage = { statusText: 'fail', data: 'Activation Code is not valid!' };
      return this.responseMessage;
    } catch (error) {
      logger.debug('Activation error');
      throw error;
    }
  }

  async login(rawLoginData: ILoginInput): Promise<IUserProfileData> {
    let checkUser: User;
    let sessionCookie: string;
    if (!utils.emailValidator(rawLoginData.email)) {
      this.responseMessage = { statusText: 'fail', data: 'Not a valid email address' };
      return this.responseMessage;
    }
    if (!utils.passwordValidator(rawLoginData.password)) {
      this.responseMessage = { statusText: 'fail', data: 'Password format is wrong' };
      return this.responseMessage;
    }
    try {
      checkUser = await this.userMapper.retrieveOne('users', 'email', rawLoginData.email);
      if (!Object.keys(checkUser).length) {
        this.responseMessage = { statusText: 'fail', data: 'Login failed' };
        return this.responseMessage;
      }

      const checkPassStatus = await bcrypt.compare(rawLoginData.password + config.user.password_sufix, checkUser[0].password);

      if (!checkPassStatus && !checkUser[0].blocked) {
        this.responseMessage = { statusText: 'fail', data: 'Login failed' };
        if (checkUser[0].password_attempts < config.user.password_attempts) {
          await this.userMapper.updatePasswordAttempts(checkUser[0].email, checkUser[0].password_attempts + 1);
        } else {
          await this.userMapper.blockAccount(checkUser[0].email);

          logger.warning({ description: `User account ${checkUser[0]} has been blocked1`, severity: 5, securityFlag: true });
          const unblockCode = await validationCodesService.updateAccountCode(
            checkUser[0].id,
            ValidationCodeType.blockAccount,
            config.validation_codes.unblockAccountCodeTTL
          );
          if (unblockCode) {
            await emailService.sendMail(checkUser[0].email, 'Blocked account', 'block_account_info');
          }
        }
        return this.responseMessage;
      } else if (checkPassStatus && checkUser[0].blocked) {
        this.responseMessage = { statusText: 'blocked', data: 'MFA required' };
        return this.responseMessage;
      } else if (!checkPassStatus && checkUser[0].blocked) {
        this.responseMessage = { statusText: 'fail', data: 'Login failed' };
        return this.responseMessage;
      }

      sessionCookie = await sessionService.createSession(checkUser[0]);
      if (checkUser[0].password_attempts > 0 && checkUser[0].password_attempts < config.user.password_attempts) {
        this.userMapper.updatePasswordAttempts(checkUser[0].email, 0);
      }
    } catch (error) {
      logger.debug('user.service ---> login error', error);
      throw error();
    }
    this.responseMessage = {
      statusText: 'success',
      data: sessionCookie,
      userData: {
        firstName: checkUser[0].firstName,
        lastName: checkUser[0].lastName,
        email: checkUser[0].email,
        roleId: checkUser[0].roleId
      }
    };
    return this.responseMessage;
  }

  async unblockAccount(user_email: string, unblock_code: string): Promise<IResponceMessage> {
    let checkUser: User;
    let sessionCookie: string;
    try {
      const userId: number = await this.userMapper.getUserIdByEmail(user_email);
      const isCodeValid = await validationCodesService.isCodeValid(userId, unblock_code);

      if (isCodeValid) {
        await this.userMapper.activateAccount(user_email);
        checkUser = await this.userMapper.retrieveOne('users', 'email', user_email);
        sessionCookie = await sessionService.createSession(checkUser[0]);
        this.responseMessage = {
          statusText: 'success',
          data: sessionCookie,
          userData: {
            firstName: checkUser[0].firstName,
            lastName: checkUser[0].lastName,
            email: checkUser[0].email,
            roleId: checkUser[0].roleId
          }
        };
        await this.userMapper.activateAccount(user_email);
        await validationCodesService.markAsUsed(userId);
        return this.responseMessage;
      }

      this.responseMessage = { statusText: 'fail', data: 'Code is not valid!' };
      return this.responseMessage;
    } catch (error) {
      logger.debug('Unblock Account error');
      throw error;
    }
  }

  async logout(sessionId: string): Promise<IResponceMessage> {
    try {
      await sessionService.deleteSessionById(sessionId);
    } catch (error) {
      throw error;
    }
    this.responseMessage = { statusText: 'success', data: 'SessionId was deleted' };
    return this.responseMessage;
  }

  async resendCode(user_email: string): Promise<IResponceMessage> {
    try {
      const userId: number = await this.userMapper.getUserIdByEmail(user_email);
      if (userId) {
        const validationCodeData = await validationCodesService.getCodeData(userId);
        const isExpired = utils.isCodeExpired(validationCodeData?.expires_at);
        if (validationCodeData && !validationCodeData?.used && isExpired) {
          const unblockCode = await validationCodesService.updateAccountCode(
            userId,
            ValidationCodeType.blockAccount,
            config.validation_codes.unblockAccountCodeTTL
          );
          if (unblockCode) {
            await emailService.sendMail(user_email, 'Unblock account code', 'unblock_account', [unblockCode]);
          }
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.responseMessage = {
        statusText: 'success',
        data: 'If the account exists, an email was send with an unblock code!'
      };
      return this.responseMessage;
    }
  }

  async updateProfile(userData: IUpdateProfileInput, userEmail: string, sessionId: string): Promise<boolean> {
    const checkUser = await this.userMapper.retrieveOne('users', 'email', userEmail);

    if (userData.newPassword) {
      const isOldPasswordCorrect = await bcrypt.compare(userData.oldPassword + config.user.password_sufix, checkUser[0].password);

      if (!isOldPasswordCorrect) {
        return null;
      }

      if (!utils.passwordValidator(userData.newPassword)) {
        return null;
      }
    }

    const updateUserData: { firstName?: string; lastName?: string; password?: string } = {};

    if (userData.firstName) {
      updateUserData.firstName = userData.firstName;
    }
    if (userData.lastName) {
      updateUserData.lastName = userData.lastName;
    }
    if (userData.newPassword) {
      updateUserData.password = await bcrypt.hash(userData.newPassword + config.user.password_sufix, 10);
    }
    try {
      const updatedUser = await this.userMapper.updateProfile(updateUserData, userEmail);
      if (updatedUser) {
        return true;
      }
    } catch {
      return null;
    }
  }

  async findUserByEmail(userEmail: string): Promise<User> {
    const user: User = await this.userMapper.retrieveOne('users', 'email', userEmail);
    return user;
  }

  async checkEmailExistance(userEmail: string): Promise<boolean> {
    const user: User = await this.findUserByEmail(userEmail);
    if (Object.keys(user).length) {
      return true;
    } else {
      return false;
    }
  }

  async sendUserProfileData(req): Promise<IUserProfileData | null> {
    if (req.sessionData && req.sessionData[0] != null) {
      const checkUser = await this.userMapper.retrieveOne('users', 'email', req.sessionData[0].userEmail);
      if (checkUser) {
        this.responseMessage = {
          statusText: 'success',
          data: 'User profile data',
          userData: {
            firstName: checkUser[0].firstName,
            lastName: checkUser[0].lastName,
            email: checkUser[0].email,
            roleId: checkUser[0].roleId
          }
        };
      } else {
        this.responseMessage = {
          statusText: 'fail',
          data: 'User profile data not found',
          userData: {
            firstName: null,
            lastName: null,
            email: null,
            roleId: null
          }
        };
        await sessionService.deleteSessionById(req.cookies.sessionId);
      }
      return this.responseMessage;
    } else {
      return null;
    }
  }

  async requestResetPassword(userEmail: string): Promise<any> {
    if (utils.emailValidator(userEmail)) {
      const user: User = await this.findUserByEmail(userEmail);
      if (user) {
        const accountCodeData: IValidationCodes = await validationCodesService.getCodeData(user[0].id);
        if (accountCodeData.type == ValidationCodeType.PasswordReset || accountCodeData.used == true) {
          const createResetPasswordCode = await validationCodesService.updateAccountCode(
            user[0].id,
            ValidationCodeType.PasswordReset,
            config.validation_codes.resetPasswordCodeTTL
          );
          const data = [userEmail, createResetPasswordCode];
          await emailService.sendMail(userEmail, 'Reset Password', 'request_password_reset', data);
        }
        return false;
      }
      return false;
    }
    return false;
  }

  async resetPassword(rawData: IResetPassword): Promise<any> {
    if (utils.emailValidator(rawData.email) && rawData.resetCode.length === 16) {
      const userEmail = rawData.email;
      const resetCode = rawData.resetCode;
      const user: User = await this.findUserByEmail(userEmail);
      if (user) {
        let codeIsValid = await validationCodesService.isCodeValid(user[0].id, resetCode);
        if (codeIsValid) {
          if (utils.passwordValidator(rawData.newPassword)) {
            const updateUserData: { firstName?: string; lastName?: string; password?: string } = {};
            updateUserData.password = await bcrypt.hash(rawData.newPassword + config.user.password_sufix, 10);
            try {
              await validationCodesService.markAsUsed(user[0].id);
              await this.userMapper.updateProfile(updateUserData, userEmail);
              emailService.sendMail(userEmail, 'Update Password', 'user_account_update_info', 'password').catch(err => {
                logger.debug('Email was not send');
              });
            } catch {
              return null;
            }
          }
        }
      }
    } else {
      return false;
    }
  }
}
