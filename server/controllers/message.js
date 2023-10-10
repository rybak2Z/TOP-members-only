const asyncHandler = require("express-async-handler");
const Message = require("../models/message");

const delete_message = asyncHandler(async (req, res) => {
  if (!req.user?.isAdmin) {
    return res.status(401).end();
  }

  const removedMessage = await Message.findByIdAndRemove(req.params.id).exec();
  if (!removedMessage) {
    return res.status(400).end();
  }
  res.status(200).end();
});

module.exports.delete_message = delete_message;
