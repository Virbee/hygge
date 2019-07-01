const express = require("express");
const router = new express.Router();
//const data = require("../bin/seeds");
const Recipe = require("../models/Recipe");
const Picture = require("../models/Picture");
const Moto = require("../models/Moto");
//importer data

///////AFFICHAGE DYNAMIQUE//////////
router.get("/", (req, res) => {
  res.render("home");
});

router.get("/add_elements", (req, res) => {
  res.render("add_elements");
});

module.exports = router;
