const express = require("express");

const { post_sign_up } = require("../controllers/sign-up");
const { post_log_in } = require("../controllers/log-in");
const { get_log_out } = require("../controllers/log-out");
const { post_join_club } = require("../controllers/join-club");
const { post_create_message } = require("../controllers/create-message");
const { get_messages } = require("../controllers/messages");
const { delete_message } = require("../controllers/message");

const router = express.Router();

router.post("/sign-up", post_sign_up);

router.post("/log-in", post_log_in);

router.get("/log-out", get_log_out);

router.post("/join-club", post_join_club);

router.post("/create-message", post_create_message);

router.get("/messages", get_messages);

router.delete("/message/:id", delete_message);

module.exports = router;
