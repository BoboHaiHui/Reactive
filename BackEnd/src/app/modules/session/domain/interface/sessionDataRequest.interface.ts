export interface ISessioDataRequest{
  sessionId?: string,
  userId?: number,
  sessionExpiration?: number,
  idleExpiration?: number,
  userRole?: number,
  permissions?: string[]
}