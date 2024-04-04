import { randomBytes } from 'crypto';

function generateSessionCookie(){
  return randomBytes(20).toString('hex');
}

export { generateSessionCookie }