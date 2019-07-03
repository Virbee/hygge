const express = require("express");
const router = new express.Router();
const Recipe = require("../models/Recipe");
const Picture = require("../models/Picture");
const Moto = require("../models/Moto");
//importer data
const recipes = require("../bin/recipes");
const pictures = require("../bin/pictures");
const sentences = require("../bin/motos");

///////////RANDOM FUNCTION////////
function chooseRandom(items) {
  const i = Math.floor(Math.random() * items.length);
  return items[i];
}

///////AFFICHAGE DYNAMIQUE//////////
router.get("/", (req, res) => {
  res.render("home");
});

router.get("/journal", (req, res) => {
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
    console.log(recipe, moto, picture);
    res.render("journal", { recipe, moto, picture, drink });
  });
});

router.get("/show/:id", (req, res) => {
  Recipe.findById(req.params.id)
    .then(recipe => res.render("show", { recipe }))
    .catch(err => console.log(err));
});

///////////INSERT DATA///////////
function insertData(recipes, sentences, pictures) {
  Recipe.insertMany(recipes)
    .then(recipe => console.log(recipes))
    .catch(err => console.log(err));
  Moto.insertMany(sentences)
    .then(moto => console.log(sentences))
    .catch(err => console.log(err));
  Picture.insertMany(pictures)
    .then(picture => console.log(pictures))
    .catch(err => console.log(err));
}

//insertData(recipes, sentences, pictures);
module.exports = router;
