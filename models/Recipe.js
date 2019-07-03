const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  img: {
    type: String,
    required: true,
    default: "/media/IMG_3914.jpg"
  },
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  ingredients: {
    type: [String]
  },
  instructions: {
    type: [String]
  },
  category: {
    type: [String],
    required: true,
    enum: ["breakfast", "desert", "dish", "drink", "starter", "teatime"]
  },
  preparationTime: { type: Number, required: true },
  season: { type: [String], enum: ["Spring", "Summer", "Fall", "Winter"] }
});

RecipeSchema.index({ name: "text", ingredients: "text" });

const Recipe = mongoose.model("Recipe", RecipeSchema);
module.exports = Recipe;
