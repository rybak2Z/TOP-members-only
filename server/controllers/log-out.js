const post_log_out = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).end();
  });
};

module.exports.post_log_out = post_log_out;
