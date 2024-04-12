const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter email."],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, "{VALUE} is not a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter password."],
    minlength: [8, "Password must be at least 8 characters"],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please enter confirmPassword"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passowrds are not same.",
    },
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

UserSchema.methods.correctPassword = async function (password, hash) {
  return await bcrypt.compare(password, hash);
};

const User = new mongoose.model("user", UserSchema);
module.exports = User;
