const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    Name: { type: String, require: [true, "Please enter the Name."] },
    email: {
      type: String,
      require: [true, "Please enter yout email."],
      unique: [true, "Please enter unique email address"],
    },
    password: { type: String, require: [true, "Please enter your password."] },
    address: [
      { city: String },
      { country: String },
      { address1: String },
      { address2: String },
      { zip: String },
      { addressType: String },
      { role: String },
      { avatar: String },
      { url: String },
    ],
    role: { type: String, default: "user" },
    avatar: { url: {}, public_id: { type: String, require: true } },
    resetPasswordToken: String,
    resetPasswordTime: Date,
  },
  { versionKey: false }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = userModel;
