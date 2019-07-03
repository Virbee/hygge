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
        .then(recipes => res.render("partials/manage_recipe", { recipes }))
        .catch();
    } else if (mod == "Picture") {
      Picture.find()
        .then(pictures => res.render("partials/manage_picture", { pictures }))
        .catch();
    } else {
      Moto.find()
        .then(motos => res.render("partials/manage_motos", { motos }))
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
      .then(res.redirect("/manage/Recipe"))
      .catch(err => console.log(err));
  } else if (mod == "Picture") {
    res.render("add_picture");
  } else {
    res.render("add_sentence");
  }
});

///////////EDIT////////////

router.get("/edit/Recipe/:id", (req, res) => {
  Recipe.findById(req.params.id)
  .then(recipe =>res.render("edit_recipe", {recipe}))
  .catch(err=> console.log(err))
  ;
});

module.exports = router;
