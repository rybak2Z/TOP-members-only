require("dotenv").config();

const express = require("express");
const path = require("path");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
const debug = require("debug")("server:server");

const authentication = require("./middleware/authentication");
const session = require("./middleware/session");
const security = require("./middleware/security");

const apiRouter = require("./routes/api");

connectToDb().catch((err) => console.log(err));
async function connectToDb() {
  mongoose.set("strictQuery", false);
  const mongoDbUri = process.env.MONGODB_URI;
  const databaseName = process.env.DB_NAME;
  await mongoose.connect(mongoDbUri, { dbName: databaseName });
  debug("Successfully connected to mongodb");
}

const app = express();

app.use(security);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session);
app.use(authentication);
app.use(compression());

app.use(express.static(path.join(__dirname, "public")));
app.use("/api", apiRouter);

module.exports = app;
