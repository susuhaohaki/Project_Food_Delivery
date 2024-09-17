const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imagePublicId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  cdate: {
    type: Date,
    default: Date.now,
  },
  category: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    name: String,
  },
});

module.exports = mongoose.model("Product", productSchema);
