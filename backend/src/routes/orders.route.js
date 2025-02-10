const express = require("express");
const router = express.Router();
const verfiyUser = require("../middlewares/jwt-verify.js");
const {
  CreateOrderController,
  GetUserOrdersController,
  CancelOrder,
} = require("../controllers/order.controller.js");
const verifyUser = require("../middlewares/jwt-verify.js");

// POST - /confirm-order {addrss, items, totalAmount}

router.post("/confirm-order", verifyUser, CreateOrderController);
router.get("/user-order-data", verifyUser, GetUserOrdersController);
router.patch("/cancel-order", verifyUser, CancelOrder);

module.exports = router;
