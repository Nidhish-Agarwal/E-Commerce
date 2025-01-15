// route
const multer = require("multer");
const upload = multer({ dest: "temp-uploads/" });
const express = require("express");
const verifyUser = require("../middlewares/jwt-verify.js");

const {
  createProductController,
  getProductDataController,
  updateProductController,
  getSinglePRoductDocumentController,
  deleteSingleProductController,
} = require("../controllers/product.controller.js");
const router = express.Router();
router.post(
  "/create-product",
  upload.array("files", 5),
  verifyUser,
  createProductController
);

router.get("/get-products", getProductDataController);
router.put(
  "/update-products/:id",
  upload.array("files", 5),
  updateProductController
);
router.get("/get-single/:id", getSinglePRoductDocumentController);
router.delete("/:id", deleteSingleProductController);

module.exports = router;
