const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
  book: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: String, required: true },
  species: { type: String, required: true },
  powers: { type: String, required: true },
  summary: { type: String, required: true }
});

module.exports = mongoose.model("Character", CharacterSchema);