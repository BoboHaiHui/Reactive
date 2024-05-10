import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';

import config from '../../../../config';
import { emailService, sessionService } from '../../../shared/diContainer/diContainer';
import logger from '../../../shared/services/logger/logger.service';
import { generateRandomBytes } from '../../../shared/utils/randomBytes';
import { utils } from '../../../shared/utils/validations';
import { ILoginInput, IRegisterInput, IResponceMessage, IUserProfileData } from '../domain/interface/input/userRegisterInput.interface';
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
        await emailService.sendMail(registerData.email, 'Activate Reactive Accout', 'activate_account', registerData.activation_code);
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
      //add logic if the user is blocked
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

  async update(tableName: string, userData: User, field: string, value: string | number): Promise<User> {
    return await this.userMapper.update(tableName, userData, field, value);
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
      this.responseMessage = {
        statusText: 'success',
        data: 'User profile data',
        userData: {
          firstName: req.sessionData[0].userFirstName,
          lastName: req.sessionData[0].userLastName,
          email: req.sessionData[0].userEmail,
          roleId: req.sessionData[0].userRole
        }
      };
      return this.responseMessage;
    } else {
      return null;
    }
  }
}
