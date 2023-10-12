const cors = require("cors");
const helmet = require("helmet");
const RateLimit = require("express-rate-limit");

const limiter = RateLimit({
  windowMs: 1000 * 60,
  max: 100,
});

const corsOptions = {
  origin: true,
};

const security = [cors(corsOptions), limiter, helmet()];

module.exports = security;
