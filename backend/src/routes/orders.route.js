const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/jwt-verify.js");
const {
  CreateOrderController,
  GetUserOrdersController,
} = require("../controllers/order.controller.js");

// POST - /confirm-order {addrss, items, totalAmount}

router.post("/confirm-order", verifyToken, CreateOrderController);
router.get("/user-order-data", verifyToken, GetUserOrdersController);

module.exports = router;
