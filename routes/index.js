const express = require("express");
const router = new express.Router();
const Recipe = require("../models/Recipe");
const Picture = require("../models/Picture");
const Moto = require("../models/Moto");
const User = require("../models/User");
//importer data
const recipes = require("../bin/recipes");
const pictures = require("../bin/pictures");
const sentences = require("../bin/motos");
const users = require("../bin/users");

const bcrypt = require("bcrypt");

const authRoutes = require("../routes/auth");
// router.use(authRoutes);

function ensureAuth(req, res, next) {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect("/login");
  }
}

///////////RANDOM FUNCTION////////
function chooseRandom(items) {
  const i = Math.floor(Math.random() * items.length);
  return items[i];
}

///////AFFICHAGE DYNAMIQUE//////////
router.get("/", (req, res) => {
  res.render("home");
});

router.get("/journal", ensureAuth, (req, res) => {
  Promise.all([
    Recipe.find().catch(err => console.log(err)),
    Moto.find().catch(err => console.log(err)),
    Picture.find().catch(err => console.log(err), Recipe.find())
  ]).then(values => {
    const drinks = values[0].filter(value => value.category.includes("drink"));
    const recipes = values[0].filter(
      value => !value.category.includes("drink")
    );

    const drink = chooseRandom(drinks);
    const recipe = chooseRandom(recipes);
    const moto = chooseRandom(values[1]);
    const picture = chooseRandom(values[2]);
    res.render("journal", { recipe, moto, picture, drink, logged: true });
  });
});

router.get("/show/:id", (req, res) => {
  Recipe.findById(req.params.id)
    .then(recipe => {
      console.log(recipe);
      res.render("show", { recipe, scripts: ["show-recipe.js"] });
    })
    .catch(err => console.log(err));
});

///////////INSERT DATA///////////
function insertData(recipes, sentences, pictures, users) {
  Recipe.insertMany(recipes)
    .then(recipe => console.log(recipes))
    .catch(err => console.log(err));
  Moto.insertMany(sentences)
    .then(moto => console.log(sentences))
    .catch(err => console.log(err));
  Picture.insertMany(pictures)
    .then(picture => console.log(pictures))
    .catch(err => console.log(err));
  //pour chaque users password =hashed
  const usersWithCrypted = users.map(user => {
    const salt = bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(user.password, salt);
    return (user = {
      name: user.name,
      email: user.email,
      password: hashed,
      admin: user.admin
    });
  });
  User.insertMany(usersWithCrypted)
    .then(picture => console.log(users))
    .catch(err => console.log(err));
}

//insertData(recipes, sentences, pictures, users);
module.exports = router;
