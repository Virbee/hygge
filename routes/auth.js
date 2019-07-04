const express = require("express");
const router = new express.Router();
const User = require("../models/User");

const index = require("../routes/index");
router.use(index);

const bcrypt = require("bcrypt");

///////////////SIGN UP////////////////
//////////////////////////////////////

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", (req, res) => {
  const user = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashed = bcrypt.hashSync(user.password, salt);

  User.create({
    name: user.name,
    email: user.email,
    password: hashed,
    admin: false
  })
    .then(res.redirect("/journal"))
    .catch(err => console.log(err));
});

///////////////LOGIN///////////////////
///////////////////////////////////////

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  const user = req.body;
  User.findOne({ email: user.email })
    .then(dbRes => {
      if (!dbRes) {
        return res.render("login", { errorMessage: "Bad mail or password" });
      }
      if (bcrypt.compareSync(user.password, dbRes.password)) {
        req.session.currentUser = dbRes;
        if (req.session.currentUser.admin) {
          return res.redirect("/manage/Recipe");
        } else {
          return res.redirect("/journal");
        }
      } else {
        return res.render("login", { errorMessage: "Bad mail or password" });
      }
    })
    .catch(err => console.log(err));
});

///////////////LOG OUT/////////////////
///////////////////////////////////////

router.get("/logout", (req, res, next) => {
  req.session.destroy(err => {
    console.log("SESSION TERMINATED");
    res.redirect("/");
  });
});

module.exports = router;
