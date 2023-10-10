const asyncHandler = require("express-async-handler");
const { body } = require("express-validator");
const User = require("../models/user");

const MEMBERSHIP_PASSCODE = process.env.MEMBERSHIP_PASSCODE;
const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE;

const post_join_club = [
  body("passcode").escape(),
  asyncHandler(async (req, res) => {
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
];

module.exports.post_join_club = post_join_club;
