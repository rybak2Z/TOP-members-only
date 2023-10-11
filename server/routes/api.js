const express = require("express");

const { post_sign_up } = require("../controllers/sign-up");
const { post_log_in } = require("../controllers/log-in");
const { post_log_out } = require("../controllers/log-out");
const { post_join_club } = require("../controllers/join-club");
const {
  get_messages,
  post_message,
  delete_message,
} = require("../controllers/messages");

const router = express.Router();

router.post("/sign-up", post_sign_up);

router.post("/log-in", post_log_in);

router.post("/log-out", post_log_out);

router.post("/join-club", post_join_club);

router.post("/messages/", post_message);

router.get("/messages/", get_messages);

router.delete("/messages/:id", delete_message);

module.exports = router;
