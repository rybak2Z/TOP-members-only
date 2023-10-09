const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const MEMBERSHIP_PASSCODE = process.env.MEMBERSHIP_PASSCODE;

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

router.post("/log-in", passport.authenticate("local"), (req, res, next) => {
  if (req.user) {
    res.status(200).end();
  } else {
    res.status(401).end();
  }
});

router.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.post("/join-club", async (req, res, next) => {
  if (!req.user) {
    return res.redirect("/");
  }

  if (req.body.passcode !== MEMBERSHIP_PASSCODE) {
    return res.status(401).end();
  }

  const user = await User.findById(req.user.id).exec();
  user.isMember = true;
  await user.save();

  res.status(200).end();
});

module.exports = router;
