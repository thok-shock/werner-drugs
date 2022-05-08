const passport = require("passport");
const findOrCreate = require("./authFunctions");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = function () {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/login/google/callback",
      },
      function (accessToken, refreshToken, profile, cb) {
        //console.log(profile)
        findOrCreate(profile.id, profile.displayName, profile.emails[0].value)
          .then((user) => {
            return cb(null, user);
          })
          .catch((err) => {
            return cb(err, null);
          });
      }
    )
  );
  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });
};
