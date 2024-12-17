const ErrorHandler = require("../utils/ErrorHandler.js");
const UserModel = require("../models/user.model.js");
const transporter = require("../utils/sendmails.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "../config/.env",
  });
}

async function CreateUser(req, res) {
  const { Name, email, password } = req.body;

  try {
    let avatar = {};
    if (req.file) {
      avatar = {
        url: `/uploads/${req.file.filename}`,
        public_id: req.file.filename,
      };
    }
    const CheckUserPresent = await UserModel.findOne({
      email: email,
    });

    if (CheckUserPresent) {
      console.log("Already Exists");
      const error = new ErrorHandler("Already Present in DB", 400);

      return res.status(404).send({
        message: error.message,
        status: error.statusCode,
        success: false,
      });
    }

    const newUser = new UserModel({
      Name,
      email,
      password,
      avatar,
    });

    const data = {
      Name,
      email,
      password,
    };

    const token = generateToken(data);
    await transporter.sendMail({
      to: "nidhish.agarwal@kalvium.community",
      from: "nidhishagarwal14@gmail.com",
      subject: "Verification email for follow along project",
      text: "Text",
      html: `<h1>Hello World http://localhost:5173/activation/${token} </h1>`,
    });

    await newUser.save();
    return res.send("User Created Sucessfully");
  } catch (er) {
    res.send({ message: er.message });
  }
}

const generateToken = (data) => {
  const token = jwt.sign(
    { _id: data._id, name: data.name, email: data.email },
    process.env.SECRET_KEY
  );
  return token;
};

async function verifyUserController(req, res) {
  const { token } = req.params;
  try {
    if (verifyUser(token)) {
      return res.status(200).cookie();
    }
    return res.status(403).send({ message: "token expired" });
  } catch (er) {
    return res.status(403).send({ message: er.message });
  }
}

const verifyUser = () => {
  const verify = jwt.verify(token, process.env.SECRET_KEY);
  return verify;
};

const signup = async (req, res) => {
  const { Name, email, password } = req.body;
  console.log(req.body);
  try {
    const checkUserPresentInDB = await UserModel.findOne({ email: email });
    if (checkUserPresentInDB) {
      return res.status(403).send({ message: "User already present" });
    }
    bcrypt.hash(password, 10, async function (err, hash) {
      if (err) {
        return res
          .status(403)
          .send({ message: "Please enter the password..." });
      }

      await UserModel.create({
        Name: Name,
        email: email,
        password: hash,
      });
    });

    return res.status(201).send({ message: "User created sucessfully" });
  } catch (er) {
    return res.status(500).send({ message: er.message });
  }
};

const login = async (req, res) => {
  try {
    const { Name, email, password } = req.body;
    const checkUserPresentInDB = await UserModel.findOne({ email: email });
    if (checkUserPresentInDB) {
      bcrypt.compare(
        password,
        checkUserPresentInDB.password,
        function (err, result) {
          if (err) {
            return res
              .status(403)
              .send({ message: er.message, success: false });
          }

          let data = {
            id: checkUserPresentInDB._id,
            email,
            password: checkUserPresentInDB.password,
          };

          const token = generateToken(data);

          return res
            .status(200)
            .cookie("token", token)
            .send({ message: "User logged in sucessfully..", success: true });
        }
      );
    }

    return res
      .status(403)
      .send({ message: "User not found...", success: false });
  } catch (er) {
    return res.status(403).send({ message: er.message, success: false });
  }
};

module.exports = { CreateUser, verifyUserController, signup, login };
