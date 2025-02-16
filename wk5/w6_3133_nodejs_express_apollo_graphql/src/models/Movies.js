const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  director_name: { type: String, required: true },
  production_house: { type: String, required: true },
  release_date: { type: Date, required: true },
  rating: { type: Number, required: true }
});

module.exports = mongoose.model("Movie", MovieSchema);
