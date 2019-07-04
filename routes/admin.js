const express = require("express");
const router = new express.Router();
const Recipe = require("../models/Recipe");
const Picture = require("../models/Picture");
const Moto = require("../models/Moto");
const uploader = require("./../config/cloudinary");

const categories = [
  "breakfast",
  "desert",
  "dish",
  "drink",
  "starter",
  "teatime"
];
const seasons = ["Spring", "Summer", "Fall", "Winter"];

//////////cloudinary///////////
// router.post("/add_picture", uploader.single("img"), (req, res) => {
//   if (req.file && req.file.secure_url) {
//     console.log(req.file.secure_url);
//     let url = req.file.secure_url;
//     Picture.create({
//       img: url
//     })
//       .then(dbRes => {
//         console.log("img upload ok");
//         res.redirect("/manage/Picture");
//       })
//       .catch(dbErr => {
//         console.log("img upload not ok");
//         res.redirect("/manage/Picture");
//       });
//     return;
//   }

//   Picture.create({})
//     .then(dbRes => {
//       console.log("img create default ok");
//       console.log(dbRes);
//     })
//     .catch(dbErr => {
//       console.log("img create default not ok");
//       console.log(dbErr);
//     });
// });
// router.post("/add_recipe", uploader.single("img"), (req, res) => {
//   if (req.file && req.file.secure_url) {
//     console.log(req.file.secure_url);
//     let url = req.file.secure_url;
//     Picture.create({
//       img: url
//     })
//       .then(dbRes => {
//         console.log("img upload ok");
//         res.redirect("/manage/Recipe");
//       })
//       .catch(dbErr => {
//         console.log("img upload not ok");
//         res.redirect("/manage/Recipe");
//       });
//     return;
//   }
// });
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
    res.render("add_recipe", { scripts: ["form-recipe.js"] });
  } else if (mod == "Picture") {
    res.render("add_picture");
  } else {
    res.render("add_sentence");
  }
});

router.post(
  ["/add/Recipe", "/add/Picture", "/add/Moto"],
  uploader.single("img"),
  (req, res) => {
    const url = req.url;
    const urlSplit = url.split("/");
    const mod = urlSplit[2];
    if (mod == "Recipe") {
      let url = req.file.secure_url;
      const {
        name,
        description,
        ingredients,
        instructions,
        category,
        preparation,
        season
      } = req.body;
      Recipe.create({
        name: name,
        description: description,
        img: url,
        ingredients: ingredients,
        instructions: instructions,
        category: category,
        preparationTime: preparation,
        season: season
      })
        .then(res.redirect("/manage/Recipe"))
        .catch(err => console.log(err));
    } else if (mod == "Picture") {
      let url = req.file.secure_url;
      Picture.create({
        img: url
      })
        .then(dbRes => {
          console.log("img upload ok");
          res.redirect("/manage/Picture");
        })
        .catch(dbErr => {
          console.log("img upload not ok");
          res.redirect("/manage/Picture");
        });
      return;
    } else {
      const { sentence } = req.body;
      Moto.create({
        sentence
      })
        .then(res.render("add_sentence"))
        .catch(err => console.log(err));
    }
  }
);

///////////EDIT////////////

router.get("/edit/Recipe/:id", (req, res) => {
  Recipe.findById(req.params.id).then(recipe => {
    const checkedCat = categories.map(cat => {
      return { cat, checked: recipe.category.indexOf(cat) >= 0 };
    });
    const checkedSeason = seasons.map(seas => {
      return { seas, checked: recipe.season.indexOf(seas) >= 0 };
    });
    res
      .render("edit_recipe", {
        recipe,
        category: checkedCat,
        season: checkedSeason
      })
      .catch(err => console.log(err));
  });
});

module.exports = router;
