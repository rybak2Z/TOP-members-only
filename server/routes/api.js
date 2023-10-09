const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const router = express.Router();

router.post("/sign-up", async (req, res, next) => {
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    if (err) {
      return next(err);
    }

    try {
      const user = new User({
        username: req.body.username,
        password: hashedPassword,
        isMember: false,
      });
      await user.save();
      res.end();
    } catch (err) {
      return next(err);
    }
  });
});

router.post(
  "/log-in",
  passport.authenticate("local"),
  (req, res, next) => {
    if (req.user) {
      res.status(200).end();
    } else {
      res.status(401).end();
    }
  }
);

router.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
