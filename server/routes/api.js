const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Message = require("../models/message");

const MEMBERSHIP_PASSCODE = process.env.MEMBERSHIP_PASSCODE;
const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE;

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
        isAdmin: false,
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
    res
      .status(200)
      .json({ username: req.user.username, isMember: req.user.isMember });
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

  const validPasscode =
    req.body.passcode === MEMBERSHIP_PASSCODE ||
    req.body.passcode === ADMIN_PASSCODE;
  if (!validPasscode) {
    return res.status(401).end();
  }

  const user = await User.findById(req.user.id).exec();
  user.isMember = true;
  if (req.body.passcode === ADMIN_PASSCODE) {
    user.isAdmin = true;
  }

  await user.save();

  res.status(200).end();
});

router.post("/create-message", async (req, res, next) => {
  if (!req.user) {
    return res.status(400).end();
  }

  const message = new Message({
    text: req.body.messageText,
    user: req.user.id,
    date: Date.now(),
  });

  await message.save();
  res.status(200).end();
});

router.get("/messages", async (req, res, next) => {
  if (!req.user) {
    return res.status(400).end();
  }

  const query = Message.find();
  if (req.user.isMember) {
    query.select("-_id text user date");
    query.populate("user", "-_id username");
  } else {
    query.select("-_id text");
  }

  const messages = await query.exec();
  res.json({ messages });
});

module.exports = router;
