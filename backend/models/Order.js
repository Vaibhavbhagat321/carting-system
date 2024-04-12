const mongoose = require("mongoose");
const validator = require("validator");

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required: [true, "Order must belong to a user."],
  },
  carts: {
    type: [{ type: mongoose.Schema.ObjectId, ref: "cart" }],
    required: [true, "Order must have a Cart items."],
  },
  contact: {
    type: Number,
    required: [true, "Please provide contact."],
  },
  address: {
    type: String,
    trim: true,
    required: [true, "Please provide address."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["ordered", "delivered"],
    default: "ordered",
  },
});

OrderSchema.pre(/^find/, function (next) {
  this.populate({ path: "user" }).populate({ path: "carts" });
  next();
});

const Order = new mongoose.model("order", OrderSchema);
module.exports = Order;
