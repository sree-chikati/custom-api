const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Populate = require("../utils/autopopulate");

const CharacterSchema = new Schema({
  book: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: String, required: true },
  species: { type: String, required: true },
  powers: { type: String, required: true },
  summary: { type: String, required: true },
  author : { type: Schema.Types.ObjectId, ref: "User", required: true }
});

// Always populate the author field
CharacterSchema
    .pre('findOne', Populate('author'))
    .pre('find', Populate('author'))


module.exports = mongoose.model("Character", CharacterSchema);