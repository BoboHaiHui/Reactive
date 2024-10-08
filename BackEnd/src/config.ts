import dotenv from 'dotenv';

dotenv.config();

const SERVER_BASE_URL = 'http://localhost';
const SERVER_PORT = 4000;
const FE_BASE_URL = 'http://localhost';
const FE_PORT = 4200;
const connectionLimit: number = parseInt(process.env.CONNECTION_LIMIT || '10', 10);
const host = process.env.HOST;
const user = process.env.USER;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;

const config = {
  server: {
    base_url: SERVER_BASE_URL,
    port: SERVER_PORT
  },
  frontend: {
    base_url: FE_BASE_URL,
    port: FE_PORT
  },
  dataBase: {
    connectionLimit: connectionLimit,
    host: host,
    user: user,
    password: password,
    database: database
  },
  user: {
    defaultUserId: 2,
    blocked: true,
    activationCodeLength: 8,
    password_sufix: process.env.PASSWORD_SUFIX,
    password_attempts: 3
  },
  validation_codes: {
    activateAccountCodeTTL: 1440,
    unblockAccountCodeTTL: 2,
    codeLength: 8
  },
  session: {
    sessionExpiration: 4,
    idelExpiration: 1
  },
  email: {
    session_API: process.env.SENDGRID_API_KEY,
    from_email_address: process.env.FROM_EMAIL
  }
};

export default config;
