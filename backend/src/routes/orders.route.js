const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/jwt-verify.js");
const { CreateOrder } = require("../controllers/order.controller.js");
// POST - /confirm-order {addrss, items, totalAmount}
router.post("/confirm-order", verifyToken, CreateOrder);
module.exports = router;
