const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");

function usernameValidation() {
  return body("username")
    .trim()
    .escape()
    .isLength({ min: 1 })
    .withMessage("Username must not be empty.")
    .isLength({ max: 16 })
    .withMessage("Username can be only up to 16 characters long.")
    .isAlphanumeric()
    .withMessage("Username must only contain alphanumeric characters.")
    .custom(async (username) => {
      const userWithSameUsername = await User.findOne({ username }).exec();
      if (userWithSameUsername !== null) {
        throw new Error("Username is already taken.");
      }
      return true;
    });
}

function passwordValidation() {
  return body("password")
    .trim()
    .escape()
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters long.")
    .isLength({ max: 128 })
    .withMessage("Password can be only up to 128 characters long.")
    .isAlphanumeric()
    .withMessage("Password must only contain alphanumeric characters.")
    .custom((password, { req }) => password === req.body.confirmPassword)
    .withMessage("Password and confirm password must match.");
}

const post_sign_up = [
  usernameValidation(),
  passwordValidation(),
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
];

module.exports.post_sign_up = post_sign_up;
