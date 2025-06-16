import express from 'express';

import { userController } from '../modules/user/controller/user.controller';
import { userAuthController } from '../modules/user/controller/user.auth.controller';
import { checkPermissions } from '../shared/middleware/checkPermission';

const userRoutes = express.Router();

userRoutes.route('/register').post(userController.register);

userRoutes.route('/login').post(userController.login);

userRoutes.route('/auth/:platform').get(userAuthController.socialAuth);

userRoutes.route('/auth/:platform/callback').get(userAuthController.socialPlatformCallback);

// userRoutes.route('/socialAuth').get(userAuthController.socialAuth);

userRoutes.route('/logout').get(userController.logout);

userRoutes.route('/profileUserData').get(userController.sendUserProfileData);

userRoutes.route('/updateProfile').patch(checkPermissions('UpdateMyProfile'), userController.updateProfile);

userRoutes.route('/activateAccount').patch(userController.activateAccount);

userRoutes.route('/unblockAccount').patch(userController.unblockAccount);

userRoutes.route('/resendCode').patch(userController.resendCode);

userRoutes.route('/requestResetPassword').post(userController.requestResetPassword);

userRoutes.route('/resetPassword').patch(userController.resetPassword);

export default userRoutes;
