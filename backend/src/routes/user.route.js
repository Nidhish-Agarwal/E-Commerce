const express = require("express");
const {
  CreateUser,
  verifyUserController,
  signup,
  login,
  getUSerData,
  AddAddressController,
  DeleteAddyController,
  GetAddressConroller,
} = require("../controllers/user.controller.js");
const multer = require("multer");
const verifyUser = require("../middlewares/jwt-verify.js");
const router = express.Router();
const jwt = require("jsonwebtoken");
const upload = multer({ dest: "temp-uploads/" });

router.post("/create-user", upload.single("file"), (req, res) => {
  CreateUser(req, res);
});

router.get("/activation/:token", verifyUserController);

router.post("/signup", upload.single("file"), signup);
router.post("/login", login);
router.get("/user-data", verifyUser, getUSerData);
router.post("/add-address", verifyUser, AddAddressController);
router.delete("/delete-address/:id", verifyUser, DeleteAddyController);
router.get("/get-addresses", verifyUser, GetAddressConroller);

module.exports = router;
