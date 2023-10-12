const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

const debug = require("debug")("server:auth");
const debugLogin = debug.extend("login");
const debugSerialize = debug.extend("serialize");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username }).exec();
      if (!user) {
        debugLogin(`Could not find user '${username}'`);
        return done(null, false, { message: "User not found" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        debugLogin(`Incorrect password for user '${username}'`);
        return done(null, false, { message: "Incorrect password" });
      }
      debugLogin(`User '${username}' logged in`);
      return done(null, user);
    } catch (err) {
      debugLogin("Error:", err);
      return done(err);
    }
  }),
);

passport.serializeUser((user, done) => {
  debugSerialize(
    `Serializing user '${user.username}' with id ${user._id.toString()}`,
  );
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    debugSerialize("Deserializing user", id);
    const user = await User.findById(id).exec();
    done(null, user);
  } catch (err) {
    debugSerialize(`Error while deserializing user ${id}: ${err}`);
    done(err);
  }
});

const authentication = [passport.initialize(), passport.session()];

module.exports = authentication;
