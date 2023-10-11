const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Message = require("../models/message");

const get_messages = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(400).json({ error: "Log in to view messages." });
  }

  const query = Message.find();
  if (req.user.isMember) {
    query.select("text user date");
    query.populate("user", "-_id username");
    // No sorting. That will be done on client, since it gets the dates.
  } else {
    query.select("text");
    // Sorting cannot happen on client because it doesn't get the dates.
    query.sort({ date: "descending" });
  }

  const messages = await query.exec();
  res.json({ messages });
});

const post_message = [
  body("messageText")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Message must not be empty.")
    .isLength({ max: 1024 })
    .withMessage("Message can be only up to 1024 characters long."),
  asyncHandler(async (req, res) => {
    if (!req.user) {
      return res.status(400).json({ error: "Log in to create a message." });
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

const delete_message = asyncHandler(async (req, res) => {
  if (!req.user?.isAdmin) {
    return res
      .status(401)
      .json({ message: "You don't have the necessary permissions." });
  }

  const removedMessage = await Message.findByIdAndRemove(req.params.id).exec();
  if (!removedMessage) {
    return res
      .status(400)
      .json({ message: "Message to be deleted could not be found." });
  }
  res.status(200).end();
});

module.exports = {
  get_messages,
  post_message,
  delete_message,
};
