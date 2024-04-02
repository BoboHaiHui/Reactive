import bcrypt from 'bcryptjs';
import { error } from 'console';
import { randomBytes } from 'crypto';

import config from '../../../../config';
import logger from '../../../shared/services/logger/logger.service';
import { utils } from '../../../shared/utils/validations';
import { ILoginInput, IRegisterInput, IResponceMessage } from '../domain/interface/input/userRegisterInput.interface';
import { User } from '../domain/models/user';
import { UserMapper } from '../mapper/user.mapper';

export class UserService {
  constructor( private userMapper: UserMapper)
  {}

 async register(rawRegisterData: IRegisterInput):Promise<IResponceMessage>{
    const tableName = 'users';
    let mapperResponce: boolean;
    let responseMessage: IResponceMessage;
    let registerData: User = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      roleId: config.user.defaultUserId,
      blocked: config.user.blocked,
      activation_code: '',
    };
    let emailUniqueness: boolean;

    if(!(rawRegisterData.firstname && rawRegisterData.lastname && rawRegisterData.email && rawRegisterData.password )) {
      responseMessage = {status: 'fail', data: "All fileds are mandatory"};
      return responseMessage;
    };
    if(!(rawRegisterData.terms )) {
      responseMessage = {status: 'fail', data: "Please agree our terms and conditions"};
      return responseMessage;
    };
    if ( rawRegisterData.firstname.length > 20 || rawRegisterData.lastname.length > 20 ) {
      responseMessage = {status: 'fail', data: "Max number of characters is 20"};
      return responseMessage;
    };
    if (! utils.passwordValidator(rawRegisterData.password)){
      responseMessage = {status: 'fail', data: "Password not strong enough"};
      return responseMessage;
    };
    if (! utils.emailValidator(rawRegisterData.email)){
      responseMessage = {status: 'fail', data: "Not a valid email address"};
      return responseMessage;
    };

    emailUniqueness = await this.checkEmailUniqueness(rawRegisterData.email);
    if ( !emailUniqueness ){
      responseMessage = {status: 'fail', data: "E-mail already in use"};
      return responseMessage;
    };

    try{
      registerData.firstName = rawRegisterData.firstname;
      registerData.lastName = rawRegisterData.lastname;
      registerData.email = rawRegisterData.email;
      registerData.activation_code = randomBytes(config.user.activationCodeLength).toString('hex');
      registerData.password = await bcrypt.hash(rawRegisterData.password + config.user.password_sufix, 10);
      mapperResponce = await this.userMapper.register(tableName, registerData);

      if (mapperResponce){
        responseMessage = {status: 'success', data: "User was created"}
        return responseMessage;
      } else {
        responseMessage = {status: 'fail', data: null}
        return responseMessage;
      }
    } catch(error){
      logger.debug('user.service --> register error', error);
    }
  }

  async login(rawLoginData: ILoginInput):Promise<IResponceMessage>{
    // return await this.userMapper.retrieveAll(tableName);
   throw error();
  }

  async retrieveAll(tableName: string):Promise<User[]>{
    return await this.userMapper.retrieveAll(tableName);
  }

  async retrieveOne(tableName: string, field: string, value: string | number): Promise<User> {
    return await this.userMapper.retrieveOne(tableName, field, value) as any;
  }

  async update(tableName: string, userData: User, field: string, value: string|number): Promise<User> {
    return await this.userMapper.update(tableName, userData, field, value);
  }

  async checkEmailUniqueness (userEmail: String): Promise<boolean> {
    const validation: Object = await this.userMapper.retrieveOne('users', 'email', userEmail);
    if ( validation ) {
      return false;
    };
    return true;
  };
}