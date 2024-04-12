import { ISessioDataRequest } from '../interface/sessionDataRequest.interface';

export class SessionDataRequest implements ISessioDataRequest {
  sessionId?: string;
  userId?: number;
  sessionExpiration?: number;
  idleExpiration?: number;
  userRole?: number;
  permissions?: string[];
  userFirstName?: string;
  userLastName?: string;
  userEmail?: string;
}
