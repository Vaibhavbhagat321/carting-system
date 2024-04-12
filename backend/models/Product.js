const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    trim: true,
    required: [true, "Product must have a name"],
  },
  description: {
    type: String,
    lowercase: true,
    trim: true,
    required: [true, "Product must have the description."],
  },
  category: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, "Product must belong to the category."],
  },
  price: {
    type: Number,
    required: [true, "Product must have a price."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  image: String,
});

const Product = new mongoose.model("product", ProductSchema);
module.exports = Product;
