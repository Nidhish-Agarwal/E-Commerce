const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    Name: { type: String, required: [true, "Please enter the Name."] },
    email: {
      type: String,
      required: [true, "Please enter yout email."],
      unique: [true, "Please enter unique email address"],
    },
    password: { type: String, required: [true, "Please enter your password."] },
    address: [
      {
        city: String,
        country: String,
        address1: String,
        address2: String,
        zip: Number,
        addressType: String,
      },
    ],
    role: { type: String, default: "user" },
    avatar: {
      url: { type: String },
      public_id: { type: String, required: false },
    },
    resetPasswordToken: String,
    resetPasswordTime: Date,
  },
  { versionKey: false }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
