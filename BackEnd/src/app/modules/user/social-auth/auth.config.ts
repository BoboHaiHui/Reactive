import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import config from '../../../../config';
import { userAuthService } from '../../../shared/diContainer/diContainer';
passport.use(
  new GoogleStrategy(
    {
      clientID: config.oAuth.google.clientID,
      clientSecret: config.oAuth.google.clientSecret,
      callbackURL: config.oAuth.google.callbackURL
    },
    async (accessToken: string, refreshToken: string, profile: Profile, done: Function) => {
      try {
        const email = profile.emails[0].verified ? profile.emails[0].value : null;
        if (email) {
          const user = await userAuthService.checkUserByEmail(email);
          if (user) {
            return done(null, user);
          }
          return done(null, false, { message: 'No account found for this email' });
        }
        return done(null, false, { message: 'No email' });
      } catch (error) {
        console.error('Error in Google Strategy callback:', error);
        return done(error, null);
      }
    }
  )
);

export default passport;
