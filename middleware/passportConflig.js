
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userdb = require('../models/U_authModel');
const { TokenError } = require('passport-oauth2');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/google/callback',
      scope: ['profile', 'email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await userdb.findOne({ googleId: profile.id }).maxTimeMS(20000);;
        if (!user) {
          user = new userdb({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            Image: profile.photos[0].value,
          });
          await user.save();
        }
        console.log("accessToken",accessToken);
console.log('profile', profile);
        return done(null, user);
      } catch (error) {
        if (error instanceof TokenError) {
          // Handle TokenError specifically
          console.error('TokenError:', error.message);
        } else {
          // Handle other errors
          console.error('Other error:', error.message);
        }
        return done(error, null);
      }
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userdb.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});