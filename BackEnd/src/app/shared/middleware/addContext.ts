import { NextFunction, Request, Response } from 'express';

import { sessionService } from '../diContainer/diContainer';

async function addContextPermissions(req: Request, res: Response, next: NextFunction){
  req.permissions = [];
  if ( req.cookies.sessionId){
    const sessionId = req.cookies.sessionId;
    const userPermissions = await sessionService.retrieveSessionIdPermissions(sessionId);
    req.permissions = userPermissions;
  };
  next();
}

export default addContextPermissions;