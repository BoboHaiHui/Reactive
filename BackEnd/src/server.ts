import app from './app';
import { connectionDB } from './app/shared/diContainer/diContainer';
import { config } from './config';

const _app = app;
const port: number = config.server.port;
const dbConnection = connectionDB;

// Start the server
_app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

const shutdownServer = async () => {
  try {
    if (dbConnection) {
      await dbConnection.stop();
    }
    console.log('server shut down');
    process.exit(0); // Exit the process gracefully
  } catch (error) {
    console.log(error);
    process.exit(1); // Exit the process with an error code
  }
};

process.on('SIGINT', shutdownServer);
process.on('SIGTERM', shutdownServer);