const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.post("/sign-up", async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      isMember: false,
    });
    await user.save();
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
