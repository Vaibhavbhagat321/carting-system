const Cart = require("../models/Cart");
const { catchAsync } = require("../utility/catchAsync");

exports.addToCart = catchAsync(async function (req, res, next) {
  const cart = await Cart.create({
    user: req.user.id,
    product: req.body.product,
  });
  res.status(200).json({ status: "success", data: cart });
});

exports.deleteCart = catchAsync(async function (req, res, next) {
  const cart = await Cart.findByIdAndDelete(req.params.cartId);

  if (!cart)
    return next(new Error(`Cart of id:${req.params.cartId} not found.`));

  res.status(200).json({ status: "success", data: cart });
});

exports.getAllCart = catchAsync(async function (req, res, next) {
  const carts = await Cart.find({ user: req.user.id, active: true });

  res
    .status(200)
    .json({ status: "success", length: carts.length, data: carts });
});

exports.updateCartProductQuantity = catchAsync(async function (req, res, next) {
  const cart = await Cart.findByIdAndUpdate(
    req.params.cartId,
    {
      quantity: req.body.quantity,
    },
    {
      new: true,
    }
  );

  if (!cart) return next(new Error(`Cant find cart of id: ${req.params.id}`));

  res.status(200).json({ status: "success", data: cart });
});
