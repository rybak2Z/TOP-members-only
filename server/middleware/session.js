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
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: { secure: useSecureCookies },
});

module.exports = sessionObj;
