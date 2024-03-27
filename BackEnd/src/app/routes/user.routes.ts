import express from 'express';

import { userController } from '../modules/user/controller/user.controller';

const userRoutes = express.Router();

userRoutes.route('/')
  .post( userController.register )

export default userRoutes;