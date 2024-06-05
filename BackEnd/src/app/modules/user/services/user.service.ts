import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';

import config from '../../../../config';
import { emailService, sessionService } from '../../../shared/diContainer/diContainer';
import logger from '../../../shared/services/logger/logger.service';
import { generateRandomBytes } from '../../../shared/utils/randomBytes';
import { utils } from '../../../shared/utils/validations';
import {
  ILoginInput,
  IRegisterInput,
  IResponceMessage,
  IUpdateProfileInput,
  IUserProfileData
} from '../domain/interface/input/userRegisterInput.interface';
import { User } from '../domain/models/user';
import { UserMapper } from '../mapper/user.mapper';

export class UserService {
  private responseMessage: IResponceMessage | IUserProfileData;

  constructor(private userMapper: UserMapper) {}

  async register(rawRegisterData: IRegisterInput): Promise<IResponceMessage> {
    const tableName = 'users';
    let mapperResponce: boolean;
    let registerData: User = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      roleId: config.user.defaultUserId,
      blocked: config.user.blocked,
      activation_code: ''
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
      registerData.activation_code = await generateRandomBytes(config.user.activationCodeLength);
      registerData.password = await bcrypt.hash(rawRegisterData.password + config.user.password_sufix, 10);
      mapperResponce = await this.userMapper.register(tableName, registerData);

      if (mapperResponce) {
        await emailService.sendMail(registerData.email, 'Activate Reactive Accout', 'activate_account', [
          registerData.activation_code,
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

  async activateAccount(user_email: string, activation_code: any): Promise<IResponceMessage> {
    try {
      let dbActivationCode = await this.userMapper.getUserActivationCode(user_email);
      if (dbActivationCode === activation_code && dbActivationCode != null) {
        const response = await this.userMapper.activateAccount(user_email);
        if (response) {
          this.responseMessage = { statusText: 'success', data: null };
        } else {
          this.responseMessage = { statusText: 'fail', data: null };
        }
        return this.responseMessage;
      }
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
        this.responseMessage = { statusText: 'fail', data: 'Wrong email or password' };
        return this.responseMessage;
      }
      if (!(await bcrypt.compare(rawLoginData.password + config.user.password_sufix, checkUser[0].password))) {
        this.responseMessage = { statusText: 'fail', data: 'Wrong email or password' };
        return this.responseMessage;
      }
      if (checkUser[0].blocked) {
        this.responseMessage = { statusText: 'fail', data: 'User is blocked! Please contact our support team' };
        return this.responseMessage;
      }
      sessionCookie = await sessionService.createSession(checkUser[0]);
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

  async logout(sessionId: string): Promise<IResponceMessage> {
    try {
      await sessionService.deleteSessionById(sessionId);
    } catch (error) {
      throw error;
    }
    this.responseMessage = { statusText: 'success', data: 'SessionId was deleted' };
    return this.responseMessage;
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
      if (updateUserData) {
        return true;
      }
    } catch {
      return null;
    }
  }

  async checkEmailExistance(userEmail: String): Promise<boolean> {
    const validation: Object = await this.userMapper.retrieveOne('users', 'email', userEmail);
    if (Object.keys(validation).length) {
      return true;
    } else {
      return false;
    }
  }

  async sendUserProfileData(req): Promise<IUserProfileData | null> {
    if (req.sessionData && req.sessionData[0] != null) {
      const checkUser = await this.userMapper.retrieveOne('users', 'email', req.sessionData[0].email);
      if (checkUser) {
        this.responseMessage = {
          statusText: 'success',
          data: 'User profile data',
          userData: {
            firstName: checkUser.firstName,
            lastName: checkUser.lastName,
            email: checkUser.email,
            roleId: checkUser.roleId
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
}
