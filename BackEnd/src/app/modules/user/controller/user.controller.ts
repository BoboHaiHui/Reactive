import { userService } from '../../../shared/diContainer/diContainer';
import logger from '../../../shared/services/logger/logger.service';
import {
  IActivateAccountData,
  ILoginInput,
  IRegisterInput,
  IRequestResetPassword,
  IResetPassword,
  IResponceMessage,
  IUnblockAccountData,
  IUpdateProfileInput,
  IUserProfileData
} from '../domain/interface/input/userRegisterInput.interface';

async function register(req, res) {
  const rawRegisterData: IRegisterInput = req.body;
  let responseMessage: IResponceMessage;
  try {
    responseMessage = await userService.register(rawRegisterData);
    if (responseMessage.statusText === 'success') {
      res.status(201).json(responseMessage);
    } else {
      res.status(422).json(responseMessage);
    }
  } catch (error) {
    logger.error(error.message, { description: 'register error', securityFlag: true, severity: 7 });
    res.status(500).json({ statusText: 'fail', data: null });
  }
}

async function activateAccount(req, res) {
  const rawActivateAccountData: IActivateAccountData = req.body;
  let responseMessage: IResponceMessage;
  try {
    responseMessage = await userService.activateAccount(rawActivateAccountData.email, rawActivateAccountData.activationCode);
    if (responseMessage.statusText === 'success') {
      res.status(201).json(responseMessage);
    } else {
      res.status(422).json(responseMessage);
    }
  } catch (error) {
    logger.error(error.message, { description: 'activation account error', securityFlag: false, severity: 7 });
    res.status(500).json({ statusText: 'fail', data: null });
  }
}

async function login(req, res) {
  const rawLoginData: ILoginInput = req.body;
  let responseMessage: IUserProfileData;
  try {
    responseMessage = await userService.login(rawLoginData);
    if (responseMessage.statusText === 'success') {
      const sessionId = responseMessage.data;
      res.cookie('sessionId', sessionId, { domain: 'localhost', httpOnly: true, secure: true, samesite: 'strict' });
      responseMessage.data = 'Login successful';
      res.status(200).json(responseMessage);
    } else if (responseMessage.statusText === 'blocked' && responseMessage.data === 'MFA required') {
      res.status(403).json({ statusText: 'blocked', data: 'MFA required' });
    } else {
      res.status(422).json({ statusText: 'fail', data: 'login error' });
    }
  } catch (error) {
    logger.error(error.message, { description: 'login error', securityFlag: true, severity: 7 });
    res.status(500).json({ statusText: 'fail', data: null });
  }
}

async function sendUserProfileData(req, res) {
  let responseMessage: IUserProfileData;
  try {
    responseMessage = await userService.sendUserProfileData(req);
    if (responseMessage) {
      return res.status(200).json(responseMessage);
    } else {
      return res.status(401).json({ statusText: 'fail', data: 'Unauthorized access' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ statusText: 'fail' });
  }
}

async function updateProfile(req, res) {
  const userModel: IUpdateProfileInput = req.body;
  let hasChanged: boolean;
  try {
    hasChanged = await userService.updateProfile(userModel, req.sessionData[0].userEmail, req.cookies.sessionId);
  } catch (error) {
    logger.error(error.message, { description: 'register error', securityFlag: true, severity: 7 });
  }
  if (hasChanged) {
    res.status(201).json({ statusText: 'success', data: null });
  } else {
    res.status(500).json({ statusText: 'fail', data: null });
  }
}

async function unblockAccount(req, res) {
  const rawUnblockAccountData: IUnblockAccountData = req.body;
  let responseMessage: IResponceMessage;
  try {
    responseMessage = await userService.unblockAccount(rawUnblockAccountData.email, rawUnblockAccountData.unblockCode);
    if (responseMessage.statusText === 'success') {
      const sessionId = responseMessage.data;
      res.cookie('sessionId', sessionId, { domain: 'localhost', httpOnly: true, secure: true, samesite: 'strict' });
      responseMessage.data = 'Login successful';
      res.status(200).json(responseMessage);
    } else {
      res.status(422).json(responseMessage);
    }
  } catch (error) {
    logger.error(error.message, { description: 'unblock account error', securityFlag: false, severity: 7 });
    res.status(500).json({ statusText: 'fail', data: null });
  }
}

async function requestResetPassword(req, res) {
  const rawRequestResetPassword: IRequestResetPassword = req.body;
  try {
    if (rawRequestResetPassword.email) {
      await userService.requestResetPassword(rawRequestResetPassword.email);
    }
  } catch (error) {
    logger.error(error.message, { description: 'request reset password error', securityFlag: false, severity: 2 });
    res.status(500).json({ statusText: 'fail', data: null });
  }
}

async function resetPassword(req, res) {
  const rawResetPasswordData: IResetPassword = { email: req.body.email, resetCode: req.body.resetCode, newPassword: req.body.newPassword };
  try {
    await userService.resetPassword(rawResetPasswordData);
  } catch (error) {
    logger.error(error.message, { description: 'reset password error', securityFlag: false, severity: 2 });
    res.status(500).json({ statusText: 'fail', data: null });
  }
}

async function resendCode(req, res) {
  const rawUnblockAccountData: IUnblockAccountData = req.body;
  let responseMessage: IResponceMessage;
  try {
    responseMessage = await userService.resendCode(rawUnblockAccountData.email);
    if (responseMessage.statusText === 'success') {
      responseMessage.data = responseMessage.data;
      res.status(201).json(responseMessage);
    } else {
      res.status(422).json(responseMessage);
    }
  } catch (error) {
    logger.error(error.message, { description: 'unblock account error', securityFlag: false, severity: 7 });
    res.status(500).json({ statusText: 'fail', data: null });
  }
}

async function logout(req, res) {
  let responseMessage: IResponceMessage;
  const sessionId: string = req.sessionData ? req.sessionData[0].sessionId : '';
  if (sessionId) {
    responseMessage = await userService.logout(sessionId);
    return res.status(200).json(responseMessage);
  } else {
    return res.status(204).end();
  }
}

export const userController = {
  register: register,
  login: login,
  updateProfile: updateProfile,
  logout: logout,
  sendUserProfileData: sendUserProfileData,
  activateAccount: activateAccount,
  unblockAccount: unblockAccount,
  resendCode: resendCode,
  requestResetPassword: requestResetPassword,
  resetPassword: resetPassword
};
