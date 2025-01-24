const ErrorHandler = require("../utils/ErrorHandler.js");
const UserModel = require("../models/user.model.js");
const transporter = require("../utils/sendmails.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cloudinary = require("../utils/cloudinary.js");
const fs = require("fs");
const mongoose = require("mongoose");

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
  console.log("generate token data", data);
  const token = jwt.sign(
    { id: data.id, name: data.name, email: data.email },
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

    console.log(req.file, process.env.cloud_name);
    const ImageAddress = await cloudinary.uploader
      .upload(req.file.path, {
        folder: "uploads",
      })
      .then((result) => {
        fs.unlinkSync(req.file.path);
        return result.url;
      });
    console.log("url", ImageAddress);

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
        avatar: {
          url: ImageAddress,
          public_id: `${email}_public_id`,
        },
      });
    });

    return res.status(201).send({ message: "User created sucessfully" });
  } catch (er) {
    console.log(er);
    return res.status(500).send({ message: er.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const checkUserPresentInDB = await UserModel.findOne({ email: email });

    if (checkUserPresentInDB) {
      bcrypt.compare(
        password,
        checkUserPresentInDB.password,
        function (err, result) {
          if (err) {
            return res
              .status(403)
              .send({ message: err.message, success: false });
          }
          console.log(result);

          // Handle wrong password
          if (!result) {
            return res
              .status(401)
              .send({ message: "Wrong Password", success: false });
          }

          // Correct password logic
          let data = {
            id: checkUserPresentInDB._id,
            email,
            password: checkUserPresentInDB.password,
          };

          const token = generateToken(data);

          return res
            .status(200)
            .cookie("token", token, { httpOnly: true })
            .send({
              message: "User logged in successfully.",
              success: true,
              token,
            });
        }
      );
    } else {
      return res
        .status(403)
        .send({ message: "User not found...", success: false });
    }
  } catch (er) {
    return res.status(403).send({ message: er.message, success: false });
  }
};

const getUSerData = async (req, res) => {
  const userId = req.UserId;
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).send({ message: "Send Valid User Id" });
    }
    const checkUserPresentinDB = await UserModel.findOne({ _id: userId });
    if (!checkUserPresentinDB) {
      return res
        .status(401)
        .send({ message: "Please Signup, user not present" });
    }
    return res.status(200).send({ data: checkUserPresentinDB });
  } catch (er) {
    return res.status(500).send({ message: er.message });
  }
};

const AddAddressController = async (req, res) => {
  const userId = req.UserId;
  const { city, country, address1, address2, zip, addressType } = req.body;
  // zip = Number(zip);
  console.log(city, country, address1, address2, zip, addressType);
  try {
    const userFindOne = await UserModel.findOne({ _id: userId });
    if (!userFindOne) {
      return res
        .status(404)
        .send({ message: "User not found", success: false });
    }

    const userAddress = {
      country,
      city,
      address1,
      address2,
      zip,
      addressType,
    };

    userFindOne.address.push(userAddress);
    const response = await userFindOne.save();

    return res
      .status(201)
      .send({ message: "User Address Added", success: true, response });
  } catch (er) {
    return res.status(500).send({
      message: "Internval Server Error",
      error: er.message,
      success: false,
    });
  }
};

const DeleteAddyController = async (req, res) => {
  const userId = req.UserId;
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(401)
        .send({ message: "Un-Authorised please signup", sucess: false });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .send({ message: "Address Id is in-valid", sucess: false });
    }
    const checkIfUSerPresent = await UserModel.findOne({ _id: userId });
    if (!checkIfUSerPresent) {
      return res
        .status(401)
        .send({ message: "Un-Authorised please signup", sucess: false });
    }
    const response = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $pull: { address: { _id: id } } },
      { new: true }
    );
    return res
      .status(201)
      .send({ message: "User Address deleted", success: true, response });
  } catch (er) {
    return res.status(500).send({ message: er.message, sucess: false });
  }
};

module.exports = {
  CreateUser,
  verifyUserController,
  signup,
  login,
  getUSerData,
  AddAddressController,
  DeleteAddyController,
};
