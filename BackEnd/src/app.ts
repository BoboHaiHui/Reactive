import express from 'express';

import userRoutes from './app/routes/user.routes';
import logger from './app/shared/services/logger/logger.service';

let app = express();

//logger middleware
app.use(logger.request);

//add req.body
app.use(express.json());

//add application routes
app.use('/user', userRoutes);

export default app;