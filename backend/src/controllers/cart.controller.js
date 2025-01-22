const CartModel = require("../models/cart.model.js");
const UserModel = require("../models/user.model.js");
const mongoose = require("mongoose");

async function AddToCartController(req, res) {
  const { productId, quantity } = req.body;
  //   console.log(req);
  const userId = req.UserId;
  console.log("userId", userId);
  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).send({ message: "Send Valid Product ID" });
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .send({ message: "Send Valid User ID", success: false });
    }
    const checkUSerpresent = await UserModel.findOne({ _id: userId });
    if (!checkUSerpresent) {
      return res
        .status(401)
        .send({ message: "Un-Authorized Please signup", success: false });
    }
    const checkIfProductPresent = await CartModel.findOne({
      productId: productId,
    });
    if (checkIfProductPresent) {
      return res
        .status(400)
        .send({ message: "Product Already Present in Cart", success: false });
    }
    await CartModel.create({
      productId,
      quantity,
      userId,
    });
    return res
      .status(201)
      .send({ message: "Product is successfully created", success: true });
  } catch (er) {
    return res.status(500).send({ message: er.message, success: false });
  }
}

async function GetProductsForUser(req, res) {
  const userId = req.UserId;
  try {
    console.log(userId);
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).send({ message: "Un-Authorized Plese signup" });
    }
    const checkUserPresrnt = await UserModel.findOne({ _id: userId });
    if (!checkUserPresrnt) {
      return res.status(401).send({ message: "Un-Authorized Plese signup" });
    }
    const data = await CartModel.find({ userId })
      .populate("productId")
      .populate("userId");
    return res.status(200).send({
      message: "Data is successfully fetched",
      success: true,
      cartData: data,
    });
  } catch (er) {
    return res.status(500).send({ message: er.message, success: false });
  }
}

module.exports = { AddToCartController, GetProductsForUser };
