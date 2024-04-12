const stripe = require("stripe")(
  "sk_test_51Ozwj3SDxRyNKSCWeATE8KMG4ZgF1wMVOM7j14SsGCnd8WWMWcwNxj7k5HgLpacWsfOx6uicBGNZBmeOvHSQZy6U00bAy71nSa"
);

const Cart = require("../models/Cart");
const Order = require("../models/Order");

const { catchAsync } = require("../utility/catchAsync");

exports.createOrder = catchAsync(async function (req, res, next) {
  const order = await Order.create({
    user: req.user.id,
    contact: req.body.contact,
    address: req.body.address,
    carts: req.body.carts,
  });

  order.carts.forEach(async (ele) => {
    await Cart.findByIdAndUpdate(ele, { active: false });
  });

  res.status(200).json({ status: "success", data: order });
});

exports.getOrders = catchAsync(async function (req, res, next) {
  const orders = await Order.find({ user: req.user.id });
  res
    .status(200)
    .json({ status: "success", length: orders.length, data: orders });
});

exports.getAllOrders = catchAsync(async function (req, res, next) {
  const orders = await Order.find();
  res
    .status(200)
    .json({ status: "success", length: orders.length, data: orders });
});

exports.getOrder = catchAsync(async function (req, res, next) {
  const order = await Order.findById(req.params.orderId);
  res.status(200).json({ status: "success", data: order });
});

exports.checkoutSession = catchAsync(async function (req, res, next) {
  const lineItems = req.body.cart.map((prod) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: prod.product.name,
      },
      unit_amount: prod.product.price * 100,
    },
    quantity: prod.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    // success_url: `${req.protocol}://${req.get("host")}`,
    success_url: req.body.success_url,
    cancel_url: req.body.cancel_url,
  });
  res.status(200).json({ staus: "success", id: session.id });
});
