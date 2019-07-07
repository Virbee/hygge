const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
//const flash = require("connect-flash");
const hbs = require("hbs");
require("dotenv").config();
require("./config/db-connection"); // database initial setup

const app = express();
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

////////SESSION SETUP//////

app.use(
  session({
    secret: "admin",
    cookie: { maxAge: 60 * 60 * 1000 },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60
    }),
    saveUninitialized: true,
    resave: true
  })
);

app.locals.site_url = process.env.SITE_URL;

function checkLoginStatus(req, res, next) {
  res.locals.user = req.session.currentUser ? req.session.currentUser : null;
  res.locals.isLoggedIn = Boolean(req.session.currentUser);
  next();
}
app.use(checkLoginStatus);

//////SET UP VIEWS/////////

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static("public"));
hbs.registerPartials(__dirname + "/views/partials");

//////////ROUTES/////////////
const authRoutes = require("./routes/auth");
app.use(authRoutes);
const basePageRouter = require("./routes/index");
app.use(basePageRouter);
const adminRouter = require("./routes/admin");
app.use(adminRouter);
const apiRecipes = require("./routes/api-recipe");
app.use("/api", apiRecipes);

const listener = app.listen(process.env.PORT || 8000, () => {
  console.log(`app started at ${process.env.SITE_URL}`);
});

module.exports = app;
