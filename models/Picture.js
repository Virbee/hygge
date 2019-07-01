const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PictureSchema = new Schema({
  img: {
    type: String,
    required: true,
    default: "/media/IMG_3914.jpg"
  }
});

const Picture = mongoose.model("Picture", PictureSchema);
module.exports = Picture;
