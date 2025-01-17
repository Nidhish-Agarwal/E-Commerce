const express = require("express");

const router = express.Router();
const verifyUser = require("../middlewares/jwt-verify.js");

const { AddToCartController } = require("../controllers/cart.controller.js");

router.post("/add-to-cart", verifyUser, AddToCartController);

module.exports = router;
