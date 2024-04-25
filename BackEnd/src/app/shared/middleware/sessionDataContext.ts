import { NextFunction, Request, Response } from 'express';

import { SessionDataRequest } from '../../modules/session/domain/models/sessionDataRequest';
import { sessionService } from '../diContainer/diContainer';
import logger from '../services/logger/logger.service';

async function addSessionDataContext(req: Request, res: Response, next: NextFunction) {
  if (req.cookies.sessionId) {
    const sessionId = req.cookies.sessionId;
    try {
      const exists = await sessionService.sessionExists(sessionId);
      if (exists) {
        const sessionData: SessionDataRequest = await sessionService.retrieveSessionData(sessionId);
        req.sessionData = sessionData;
        next();
      } else {
        next();
      }
    } catch (error) {
      logger.debug(error);
      return res.status(500).json({ statusText: 'fail', data: 'Internal server error' });
    }
  } else {
    next();
  }
}

export default addSessionDataContext;
