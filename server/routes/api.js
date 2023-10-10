const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const Message = require("../models/message");

const MEMBERSHIP_PASSCODE = process.env.MEMBERSHIP_PASSCODE;
const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE;

const router = express.Router();

router.post(
  "/sign-up",
  body("username")
    .trim()
    .escape()
    .isLength({ min: 1 })
    .withMessage("Username must not be empty.")
    .isLength({ max: 16 })
    .withMessage("Username can be only up to 16 characters long.")
    .isAlphanumeric()
    .withMessage("Username must only contain alphanumeric characters."),
  body("password")
    .trim()
    .escape()
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters long.")
    .isLength({ max: 128 })
    .withMessage("Password can be only up to 128 characters long.")
    .isAlphanumeric()
    .withMessage("Password must only contain alphanumeric characters.")
    .custom((password, { req }) => password === req.body.confirmPassword)
    .withMessage("Password and confirm password must match."),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

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
  }),
);

router.post(
  "/log-in",
  body("username").escape(),
  body("password").escape(),
  passport.authenticate("local"),
  (req, res, next) => {
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
);

router.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.post(
  "/join-club",
  body("passcode").escape(),
  asyncHandler(async (req, res, next) => {
    if (!req.user) {
      return res.redirect("/");
    }

    const validPasscode =
      req.body.passcode === MEMBERSHIP_PASSCODE ||
      req.body.passcode === ADMIN_PASSCODE;
    if (!validPasscode) {
      return res
        .status(401)
        .json({ success: false, errorMessage: "Passcode is not correct." });
    }

    const user = await User.findById(req.user.id).exec();

    let isNewStatus = !user.isMember;
    user.isMember = true;

    if (req.body.passcode === ADMIN_PASSCODE) {
      if (!user.isAdmin) {
        isNewStatus = true;
      }
      user.isAdmin = true;
    }

    await user.save();

    res.status(200).json({
      success: true,
      accountStatus: user.isAdmin ? "admin" : "club member",
      isNewStatus,
    });
  }),
);

router.post(
  "/create-message",
  body("messageText")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Message must not be empty.")
    .isLength({ max: 1024 })
    .withMessage("Message can be only up to 1024 characters long."),
  asyncHandler(async (req, res, next) => {
    if (!req.user) {
      return res.status(400).end();
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const message = new Message({
      text: req.body.messageText,
      user: req.user.id,
      date: Date.now(),
    });

    await message.save();
    res.status(200).end();
  }),
);

router.get(
  "/messages",
  asyncHandler(async (req, res, next) => {
    if (!req.user) {
      return res.status(400).end();
    }

    const query = Message.find();
    if (req.user.isMember) {
      query.select("text user date");
      query.populate("user", "-_id username");
    } else {
      query.select("text");
    }

    const messages = await query.exec();
    res.json({ messages });
  }),
);

router.delete(
  "/message/:id",
  asyncHandler(async (req, res, next) => {
    if (!req.user?.isAdmin) {
      return res.status(401).end();
    }

    const removedMessage = await Message.findByIdAndRemove(
      req.params.id,
    ).exec();
    if (!removedMessage) {
      return res.status(400).end();
    }
    res.status(200).end();
  }),
);

module.exports = router;
