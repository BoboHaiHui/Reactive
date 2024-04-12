import { ISession } from '../interface/session.interface';

export class Session implements ISession {
  sessionId: string;
  userId: number;
  sessionExpiration: number;
  idleExpiration: number;
  userRole: number;
  userFirstName: string;
  userLastName: string;
  userEmail: string;
}
