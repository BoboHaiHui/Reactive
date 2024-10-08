import { ISession } from '../interface/session.interface';

export class Session implements ISession {
  id?: number;
  sessionId: string;
  userId: number;
  sessionExpiration: number;
  idleExpiration: number;
  userRole: number;
  userFirstName: string;
  userLastName: string;
  userEmail: string;
}
