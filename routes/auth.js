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

module.exports = router;
