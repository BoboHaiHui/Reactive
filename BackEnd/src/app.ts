import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import adminRoutes from './app/routes/admin.routes';
import userRoutes from './app/routes/user.routes';
import addContextPermissions from './app/shared/middleware/addContext';
import logger from './app/shared/services/logger/logger.service';

let app = express();

app.use(cors({origin: 'http://localhost:4200', allowedHeaders:['Content-type', 'Authorization', 'Set-Cookie', 'Cookie'], credentials: true, methods:['GET','PUT','POST','DELETE', 'PATCH']}));
//logger middleware
app.use(logger.request);
app.use(cookieParser());
app.use(addContextPermissions);

//add req.body
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//add application routes
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

export default app;