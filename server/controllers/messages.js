const asyncHandler = require("express-async-handler");
const Message = require("../models/message");

const get_messages = asyncHandler(async (req, res) => {
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
});

module.exports.get_messages = get_messages;
