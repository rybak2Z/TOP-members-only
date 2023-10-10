const passport = require("passport");
const { body } = require("express-validator");

const post_log_in = [
  body("username").escape(),
  body("password").escape(),
  passport.authenticate("local"),
  (req, res) => {
    if (req.user) {
      res.status(200).json({
        username: req.user.username,
        isMember: req.user.isMember,
        isAdmin: req.user.isAdmin,
      });
    } else {
      res.redirect("/");
    }
  },
];

module.exports.post_log_in = post_log_in;
