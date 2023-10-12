const passport = require("passport");
const { body } = require("express-validator");
const debug = require("debug")("server:auth:login");

const post_log_in = [
  body("username").escape(),
  body("password").escape(),
  function (req, res, next) {
    passport.authenticate("local", function (err, user, info) {
      if (err) {
        debug("Failed authentication:", { err, user, info });
        return next(err);
      }
      if (!user) {
        debug("Failed authentication - missing user.", info ?? "");
        return res
          .status(400)
          .json({ message: "Authentication failed: Missing user" });
      }
      req.login(user, next);
    })(req, res, next);
  },
  (req, res) => {
    if (req.user) {
      res.status(200).json({
        username: req.user.username,
        isMember: req.user.isMember,
        isAdmin: req.user.isAdmin,
      });
    } else {
      res.status(400).json({ message: "Login failed." });
    }
  },
];

module.exports.post_log_in = post_log_in;
