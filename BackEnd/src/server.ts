import app from './app';
import { connectionDB } from './app/shared/diContainer/diContainer';
import logger from './app/shared/services/logger/logger.service';
import config from './config';

const _app = app;
const port: number = config.server.port;
const dbConnection = connectionDB;

// Start express
_app.listen(port, () => {
  logger.start();
});

const shutdownServer = async () => {
  try {
    if (dbConnection) {
      await dbConnection.stop();
    }
    await logger.stop();
    process.exit(0); // Exit the process gracefully
  } catch (error) {

    process.exit(1); // Exit the process with an error code
  }
};

process.on('SIGINT', shutdownServer);
process.on('SIGTERM', shutdownServer);