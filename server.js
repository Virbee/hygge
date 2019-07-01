const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
//const bodyParser = require("body-parser");
//const session = require("express-session");
const mongoose = require("mongoose");
//const MongoStore = require("connect-mongo")(session);
//const flash = require("connect-flash");
const hbs = require("hbs");
require("dotenv").config();
require("./config/db-connection"); // database initial setup

const app = express();
app.use(cookieParser());

//////SET UP VIEWS/////////

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static("public"));
hbs.registerPartials(__dirname + "/views/partials");

//////////ROUTES/////////////
const basePageRouter = require("./routes/index");
app.use(basePageRouter);

const listener = app.listen(process.env.PORT || 8000, () => {
  console.log(`app started at ${process.env.SITE_URL}`);
});

module.exports = app;
