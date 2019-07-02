const express = require("express");
const router = new express.Router();
//const data = require("../bin/seeds");
const Recipe = require("../models/Recipe");
const Picture = require("../models/Picture");
const Moto = require("../models/Moto");
const data = require("../seeds2");
//importer data

///////AFFICHAGE DYNAMIQUE//////////
router.get("/", (req, res) => {
  res.render("home");
});

router.get("/journal", (req, res) => {
  res.render("journal");
});

router.get("/show", (req, res) => {
  res.render("show");
});

//////////ADMIN//////////////////
router.get("/add_elements", (req, res) => {
  res.render("add_elements");
});

router.get("/edit_elements", (req, res) => {
  res.render("edit_elements");
});

///////////INSERT DATA///////////
function insertData(data) {
  Recipe.insertMany(data)
    .then(recipe => console.log(data))
    .catch(err => console.log(err));
  Moto.insertMany(sentences)
    .then(moto => console.log(sentences))
    .catch(err => console.log(err));
  Picture.insertMany(pictures)
    .then(picture => console.log(pictures))
    .catch(err => console.log(err));
}

//insertData(data);
module.exports = router;
