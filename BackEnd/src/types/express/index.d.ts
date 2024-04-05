import { SessionDataRequest } from '../../app/modules/session/domain/models/sessionDataRequest';

declare global {
  namespace Express {
    interface Request {
      sessionData: SessionDataRequest
    }
  }
}

export{}