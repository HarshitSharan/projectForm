const User = require("../models/user");
const { Strategy, ExtractJwt } = require("passport-jwt");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.APP_SECRET,
};

module.exports = (passport) => {
  passport.use(
    new Strategy(opts, async (payLoad, done) => {
      await User.findById(payLoad.user_id)
        .then(async (user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => {
          return done(null, false);
        });
    })
  );
};
