export interface IDBConnection {
  connect: () => Promise<any>;
  stop: () => Promise<void>;
}