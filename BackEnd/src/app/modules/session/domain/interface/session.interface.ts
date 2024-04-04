export interface ISession{
  sessionId: string,
  userId: number,
  sessionExpiration: number,
  idleExpiration: number,
  userRole: number
}