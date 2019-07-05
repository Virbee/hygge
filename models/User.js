const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  id_recipes: { type: [Schema.Types.ObjectId], ref: "Recipe" },
  admin: Boolean
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
