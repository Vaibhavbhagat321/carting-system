const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required: [true, "Cart must belong to user."],
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "product",
    required: [true, "Cart must have a product."],
  },
  quantity: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

// CartSchema.index({ product: 1, user: 1 }, { unique: true });

CartSchema.pre(/^find/, function (next) {
  this.populate({ path: "product" });
  next();
});

const Cart = new mongoose.model("cart", CartSchema);
module.exports = Cart;
