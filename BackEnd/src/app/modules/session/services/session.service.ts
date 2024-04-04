import { randomBytes } from 'crypto';

import config from '../../../../config';
import logger from '../../../shared/services/logger/logger.service';
import { User } from '../../user/domain/models/user';
import { Session } from '../domain/models/session';
import { SessionMapper } from '../mapper/session.mapper';

export class SessionService{
  public session: Session = new Session();
  constructor(private sessionMapper: SessionMapper){}

  async createSession(user: User): Promise<string>{
    const sessionCookie = randomBytes(20).toString('hex');
    this.session.sessionId = sessionCookie;
    this.session.sessionExpiration = Math.round(Date.now()/(1000*60) + config.session.sessionExpiration * 60);
    this.session.idleExpiration = Math.round( Date.now()/(1000*60) + config.session.idelExpiration * 60);
    this.session.userId = user.id;
    this.session.userRole = user.roleId;
    try{
      this.sessionMapper.createSession(this.session);
    }catch(error){
      logger.debug('session.service ---> create session error', error);
      throw(error);
    }
    return sessionCookie;
  }


}