const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Message = require("../models/message");

const post_create_message = [
  body("messageText")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Message must not be empty.")
    .isLength({ max: 1024 })
    .withMessage("Message can be only up to 1024 characters long."),
  asyncHandler(async (req, res) => {
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
];

module.exports.post_create_message = post_create_message;
