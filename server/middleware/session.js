require("dotenv").config();

const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const debug = require("debug")("server:session");

const sessionStore = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  databaseName: process.env.DB_NAME,
  collection: "sessions",
});

sessionStore.on("error", (err) => {
  debug("Error:", err);
});

const useSecureCookies = process.env.NODE_ENV === "production";

const sessionObj = session({
  secret: process.env.SESSION_SECRET,
  proxy: true,
  resave: true,
  saveUninitialized: true,
  maxAge: 1000 * 60 * 60, // 1 hour
  store: sessionStore,
  cookie: { secure: useSecureCookies, sameSite: "none" },
});

module.exports = sessionObj;
