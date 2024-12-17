const express = require("express");
const {
  CreateUser,
  verifyUserController,
  signup,
  login,
} = require("../controllers/user.controller.js");
const upload = require("../middlewares/multer.js");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/create-user", upload.single("file"), (req, res) => {
  CreateUser(req, res);
});

router.get("/activation/:token", verifyUserController);

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
