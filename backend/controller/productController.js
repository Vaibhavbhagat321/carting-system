const { catchAsync } = require("../utility/catchAsync");
const Product = require("../models/Product");

exports.createProduct = catchAsync(async function (req, res, next) {
  const { name, description, price, category } = req.body;
  const doc = await Product.create({
    name,
    description,
    price,
    category,
    // image: req.file.filename,
  });
  // console.log(req.body);
  // console.log(req.file);
  res.status(200).json({ status: "success", data: doc });
});

exports.updateProduct = catchAsync(async function (req, res, next) {
  const doc = await Product.findByIdAndUpdate(req.params.productId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc)
    return next(new Error(`Can't find product of id:${req.params.productId}`));

  res.status(200).json({ status: "success", data: doc });
});

exports.deleteProduct = catchAsync(async function (req, res, next) {
  const doc = await Product.findByIdAndDelete(req.params.productId);

  if (!doc)
    return next(new Error(`Can't find product of id:${req.params.productId}`));

  res.status(200).json({ status: "success", data: doc });
});

exports.getAllProducts = catchAsync(async function (req, res, next) {
  const docs = await Product.find({});
  res.status(200).json({ status: "success", length: docs.length, data: docs });
});

exports.getProduct = catchAsync(async function (req, res, next) {
  const docs = await Product.findById(req.params.productId);
  res.status(200).json({ status: "success", data: docs });
});
