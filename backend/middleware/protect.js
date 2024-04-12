const User = require("../models/User");
const { catchAsync } = require("../utility/catchAsync");
const jwt = require("jsonwebtoken");

exports.protect = catchAsync(async function (req, res, next) {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token)
    return next(new Error("You are not logged in! Please login to access."));

  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const currentUser = await User.findById(decode.id);

  if (!currentUser)
    return next(new Error("User belongs to this token no longer exists."));

  req.user = currentUser;

  next();
});
