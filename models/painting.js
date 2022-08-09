const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paintingSchema = new Schema({
  Title: { type: String, required: true },
  Image: { type: String, required: true },
  Description: { type: String, required: true },
  AvailableForPurchase: { type: Boolean, require: true },
  Price: { type: Number, required: true },
});

const Painting = mongoose.model("Painting", paintingSchema);

module.exports = Painting;
