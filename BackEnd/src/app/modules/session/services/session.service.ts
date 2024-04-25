import { randomBytes } from 'crypto';

import config from '../../../../config';
import logger from '../../../shared/services/logger/logger.service';
import { User } from '../../user/domain/models/user';
import { Session } from '../domain/models/session';
import { SessionDataRequest } from '../domain/models/sessionDataRequest';
import { SessionMapper } from '../mapper/session.mapper';

export class SessionService {
  public session: Session = new Session();
  constructor(private sessionMapper: SessionMapper) {}

  async createSession(user: User): Promise<string> {
    const sessionId = randomBytes(20).toString('hex');
    this.session.sessionId = sessionId;
    this.session.sessionExpiration = Math.round(Date.now() / (1000 * 60) + config.session.sessionExpiration * 60);
    this.session.idleExpiration = Math.round(Date.now() / (1000 * 60) + config.session.idelExpiration * 60);
    this.session.userId = user.id;
    this.session.userRole = user.roleId;
    this.session.userEmail = user.email;
    this.session.userFirstName = user.firstName;
    this.session.userLastName = user.lastName;
    try {
      this.sessionMapper.createSession(this.session);
    } catch (error) {
      logger.debug('session.service ---> create session error', error);
      throw error;
    }
    return sessionId;
  }
  // Obsolete
  // async retrieveSessionPermissions(sessionId: string): Promise<[]>{
  //   return await this.sessionMapper.retrieveSessionIdPermissions(sessionId);
  // }

  async retrieveSessionData(sessionId: string): Promise<SessionDataRequest> {
    return await this.sessionMapper.retrieveSessionData(sessionId);
  }

  async deleteSessionById(sessionId: string): Promise<void> {
    const field = 'sessionId';
    return await this.sessionMapper.deleteSession(field, sessionId);
  }

  async deleteUserSessions(userId: number): Promise<void> {
    const field = 'userId';
    return await this.sessionMapper.deleteSession(field, userId);
  }

  async sessionExists(sessionId: string): Promise<boolean> {
    const exists = await this.sessionMapper.sessionExists(sessionId);
    return exists;
  }
}
