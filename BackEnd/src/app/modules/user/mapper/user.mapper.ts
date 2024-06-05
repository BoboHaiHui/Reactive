import { BaseMapper } from '../../../shared/mapper/base.mapper';
import { IDBConnection } from '../../../shared/services/DB/DBConnection.interface';
import logger from '../../../shared/services/logger/logger.service';
import { IUpdateProfileInput } from '../domain/interface/input/userRegisterInput.interface';
import { User } from '../domain/models/user';

export class UserMapper extends BaseMapper<User> {
  constructor(protected dbConnection: IDBConnection) {
    super(dbConnection);
  }

  async register(tableName: string, userData: User): Promise<boolean> {
    let userRegistred: User;
    userRegistred = await this.create(tableName, userData);
    if (userRegistred) {
      return true;
    } else {
      return false;
    }
  }

  async getUserActivationCode(email: string): Promise<string | null> {
    const tableName = 'users';
    const field = 'email';
    let user: User;
    try {
      user = await this.retrieveOne(tableName, field, email);
      if (user) {
        return user[0].activation_code;
      } else {
        return null;
      }
    } catch (error) {
      logger.debug('Activation account error');
      throw error;
    }
  }

  async activateAccount(email: string): Promise<boolean> {
    const tableName = 'users';
    const field = 'email';
    const model = { blocked: 0, activation_code: null };
    try {
      const response = await this.update(tableName, model, field, email);
      if (response) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      logger.debug('Activation account error');
      throw error;
    }
  }

  async updateProfile(userData: IUpdateProfileInput, userEmail: string): Promise<User> {
    const tableName: string = 'users';
    const field: string = 'email';
    const response = await this.update(tableName, userData, field, userEmail);
    if (response) {
      return response;
    } else {
      return null;
    }
  }
}
