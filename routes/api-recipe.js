const express = require("express");
const router = new express.Router();
const Recipe = require("../models/Recipe");

router.get("/recipes", (req, res) => {
  //console.log(req.query.string);
  Recipe.find({ $text: { $search: req.query.string } })
    .then(apiRes => {
      res.json(apiRes);
    })
    .catch(err => console.log(err));
});

module.exports = router;
