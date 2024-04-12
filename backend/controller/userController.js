const User = require("../models/User");
const { catchAsync } = require("../utility/catchAsync");
const jwt = require("jsonwebtoken");

exports.login = catchAsync(async function (req, res, next) {
  if (!req.body.email || !req.body.password)
    return next(new Error("Please provide email and password."));

  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );

  if (!user || !(await user.correctPassword(req.body.password, user.password)))
    return next(new Error("Incorrect email or password"));

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({ status: "success", token });
});

exports.register = catchAsync(async function (req, res, next) {
  const user = await User.create(req.body);
  res.status(200).json({ status: "success", data: user });
});

exports.getMe = catchAsync(async function (req, res, next) {
  res.status(200).json({ status: "success", data: req.user });
});
