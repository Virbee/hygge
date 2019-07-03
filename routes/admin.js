const express = require("express");
const router = new express.Router();
const Recipe = require("../models/Recipe");
const Picture = require("../models/Picture");
const Moto = require("../models/Moto");

//////////MANAGE PAGE/////////
router.get(
  ["/manage/Recipe", "/manage/Picture", "/manage/Moto"],
  (req, res) => {
    const url = req.url;
    const urlSplit = url.split("/");
    const mod = urlSplit[2];
    if (mod == "Recipe") {
      Recipe.find()
        .then(recipes => res.render("manage_page", { recipes }))
        .catch();
    } else if (mod == "Picture") {
      Picture.find()
        .then(pictures => res.render("manage_page", { pictures }))
        .catch();
    } else {
      Moto.find()
        .then(sentences => res.render("manage_page", { sentences }))
        .catch();
    }
  }
);

/////////////DELETE////////////
router.get(
  ["/delete/Recipe/:id", "/delete/Picture/:id", "delete/Moto/:id"],
  (req, res) => {
    const url = req.url;
    const urlSplit = url.split("/");
    const mod = urlSplit[2];
    if (mod == "Recipe") {
      Recipe.findByIdAndDelete(req.params.id)
        .then(res.redirect("/manage/Recipe"))
        .catch(err => console.log(err));
    } else if (mod == "Picture") {
      Picture.findByIdAndDelete(req.params.id)
        .then(res.redirect("/manage/Picture"))
        .catch(err => console.log(err));
    } else {
      Moto.findByIdAndDelete(req.params.id)
        .then(res.redirect("/manage/Moto"))
        .catch(err => console.log(err));
    }
  }
);

//////////ADD//////////////////
router.get(["/add/Recipe", "/add/Picture", "/add/Moto"], (req, res) => {
  const url = req.url;
  const urlSplit = url.split("/");
  const mod = urlSplit[2];
  if (mod == "Recipe") {
    res.render("add_recipe");
  } else if (mod == "Picture") {
    res.render("add_picture");
  } else {
    res.render("add_sentence");
  }
});

router.post(["/add/Recipe", "/add/Picture", "/add/Moto"], (req, res) => {
  const url = req.url;
  const urlSplit = url.split("/");
  const mod = urlSplit[2];
  if (mod == "Recipe") {
    const {
      name,
      description,
      img,
      ingredients,
      instructions,
      category,
      preparation,
      season
    } = req.body;
    Recipe.create({
      name: name,
      description: description,
      img: img,
      ingredients: ingredients,
      instructions: instructions,
      category: category,
      preparationTime: preparation,
      season: season
    })
      .then(recipe => res.redirect("/show"))
      .catch(err => console.log(err));
  } else if (mod == "Picture") {
    res.render("add_picture");
  } else {
    res.render("add_sentence");
  }
});

///////////EDIT////////////

router.get("/edit_elements", (req, res) => {
  res.render("edit_elements");
});

module.exports = router;