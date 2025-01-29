import { userAuthService } from '../../../shared/diContainer/diContainer';
import passport from '../social-auth/auth.config';

async function socialAuth(req, res, next) {
  const { platform } = req.params;
  if (platform === 'google') {
    return passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
  } else {
    return res.status(400).json({ message: 'Unsupported platform' });
  }
}

async function socialPlatformCallback(req, res, next) {
  const { platform } = req.params;
  if (platform === 'google') {
    passport.authenticate('google', async (err, user, info) => {
      if (err || !user) {
        return res.redirect('http://localhost:4200/login');
      }
      try {
        const sessionId = await userAuthService.createSession(user[0]);
        res.cookie('sessionId', sessionId, { domain: 'localhost', httpOnly: true, secure: true, samesite: 'strict' });
        return res.redirect('http://localhost:4200/user');
      } catch (error) {
        console.error('Error creating session:', error);
        return res.redirect('http://localhost:4200/login');
      }
    })(req, res, next);
  } else {
    return res.status(400).json({ message: 'Unsupported platform' });
  }
}

export const userAuthController = {
  socialAuth: socialAuth,
  socialPlatformCallback: socialPlatformCallback
};
