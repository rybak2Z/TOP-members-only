require("dotenv").config();

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const User = require("./models/user");

const apiRouter = require("./routes/api");

connectToDb().catch((err) => console.log(err));
async function connectToDb() {
  mongoose.set("strictQuery", false);
  const mongoDbUri = process.env.MONGODB_URI;
  const databaseName = process.env.DB_NAME;
  await mongoose.connect(mongoDbUri, { dbName: databaseName });
  console.log("Successfully connected to mongodb");
}

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username }).exec();
      if (!user) {
        return done(null, false, { message: "User not found" });
      }
      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(express.static(path.join(__dirname, "../client/public")));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", apiRouter);

app.get("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

module.exports = app;
