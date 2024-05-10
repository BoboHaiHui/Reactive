import dotenv from 'dotenv';

dotenv.config();

const SERVER_PORT = 4000;
const connectionLimit: number = parseInt(process.env.CONNECTION_LIMIT || '10', 10);
const host = process.env.HOST;
const user = process.env.USER;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;

const config = {
  server: {
    port: SERVER_PORT
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
    password_sufix: process.env.PASSWORD_SUFIX
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
