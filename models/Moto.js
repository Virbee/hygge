const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MotoSchema = new Schema({
  sentence: {
    type: String,
    required: true,
    unique: true
  }
});

const Moto = mongoose.model("Moto", MotoSchema);
module.exports = Moto;
