const ErrorHandler = require("../utils/ErrorHandler.js");
const UserModel = require("../models/user.model");

export async function CreateUser() {
  const { Name, email, password } = res.body;

  const CheckUserPresent = await UserModel.findOne({
    email: email,
  });

  if (CheckUserPresent) {
    return new ErrorHandler("Already Exists in DB", 400);
  }

  const newUser = new UserModel({
    Name: Name,
    email: email,
    password: password,
  });

  await newUser.save();
  return res.send("User Created Sucessfully");
}
