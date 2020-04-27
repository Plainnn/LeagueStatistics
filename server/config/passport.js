const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = function(passport, GoogleStrategy) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/google/callback'
      },
      function(token, tokenSecret, profile, done) {
        console.log(profile);

        var query = { googleId: profile.id };
        var update = {
          $set: {
            googleId: profile.id
          }
        };
        var options = { new: true, upsert: true };
        User.findOneAndUpdate(query, update, options, function(err, u) {
          return done(err, u);
        });
      }
    )
  );
};
