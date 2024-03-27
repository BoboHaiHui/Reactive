import express from 'express';

import userRoutes from './app/routes/user.routes';

let app = express();

//add req.body
app.use(express.json());

//add application routes
app.use('/register', userRoutes);

export default app;