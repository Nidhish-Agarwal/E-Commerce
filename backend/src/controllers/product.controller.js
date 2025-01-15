const multer = require("multer");
const cloudinary = require("../utils/cloudinary.js");
const fs = require("fs");
const ProductModel = require("../models/Product.model.js");

// 1. extract the data
//     // 1. formdata - images  - {name:" ScreenShot: 11-10-2024"}
//     // 2. title, description....
// 2. insert the both the data into the database thorught model (blueprint of product schema)
//     1. images : formdata (image)-->cloudinary-->"https://link"
//     2. title

const createProductController = async (req, res) => {
  const {
    title,
    description,
    rating,
    discountedPrice,
    originalPrice,
    quantity,
    category,
  } = req.body;

  try {
    console.log(req);
    console.log("Files in backend", req.files, req.body);
    const arrayImage = req.files.map(async (singleFile, index) => {
      return cloudinary.uploader
        .upload(singleFile.path, {
          folder: "uploads",
        })
        .then((result) => {
          fs.unlinkSync(singleFile.path);
          return result.url;
        });
    });

    const dataImages = await Promise.all(arrayImage);
    console.log("Cloudinary Images", arrayImage);
    const StoreProductDetails = await ProductModel.create({
      title,
      description,
      rating,
      discountedPrice,
      originalPrice,
      quantity,
      category,
      images: dataImages,
      userEmail: req.userEmailAddress,
    });
    return res.status(201).send({
      message: "Image Successfully Uploaded",
      sucess: true,
      dataImages,
      StoreProductDetails,
    });
  } catch (er) {
    if (er instanceof multer.MulterError) {
      return res.status(400).send({
        message: "Multer error plese send image less than 5 ",
        success: false,
      });
    }
    console.log(er);
    return res.status(500).send({ message: er.message, success: false });
  }
};
// controller

const getProductDataController = async (req, res) => {
  try {
    const data = await ProductModel.find();
    return res
      .status(200)
      .send({ data, message: "Data Fetched Successfully", success: true });
  } catch (er) {
    // 500

    return res.status(500).send({ message: er.message, success: false });
  }
};

const updateProductController = async (req, res) => {
  console.log(req.files);
  const {
    title,
    description,
    rating,
    discountedPrice,
    originalPrice,
    quantity,
    category,
  } = req.body;
  const { id } = req.params;

  try {
    const checkIfProductExists = await ProductModel.findOne({ _id: id });
    // {
    //   name:"xyz"
    // } truthy

    // {}  falsy
    if (!checkIfProductExists) {
      return res.status(404).send({ message: "Product Not Found" });
    }

    const arrayImage =
      req.files &&
      req.files.map(async (singleFile, index) => {
        return cloudinary.uploader
          .upload(singleFile.path, {
            folder: "uploads",
          })
          .then((result) => {
            fs.unlinkSync(singleFile.path);
            return result.url;
          });
      });
    const Imagedata = req.files && (await Promise.all(arrayImage));
    const UpdatedImages = req.files ? Imagedata : req.body.images;
    const findAndUpdate = await ProductModel.findByIdAndUpdate(
      { _id: id },
      {
        title,
        description,
        rating,
        discountedPrice,
        originalPrice,
        quantity,
        category,
        images: UpdatedImages,
      },
      {
        new: true,
      }
    );

    return res.status(201).send({
      message: "Document Updated Successfully",
      success: true,
      UpdatedResult: findAndUpdate,
    });
  } catch (er) {
    console.log(er.message);
    return res.status(500).send({ message: er.message, success: false });
  }
};

const getSinglePRoductDocumentController = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await ProductModel.findOne({ _id: id });
    // console.log(data);
    if (!data) {
      return res.status(404).send({ Message: "Product Not Found" });
    }

    return res
      .status(200)
      .send({ message: "Product Successfully fetched", data, success: true });
  } catch (er) {
    return res.status(500).send({ message: er.message, success: false });
  }
};

const deleteSingleProductController = async (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  try {
    const data = await ProductModel.findOne({ _id: id });
    console.log(data);
    if (!data) {
      return res.status(404).send({ Message: "Product Not Found" });
    }

    await ProductModel.findByIdAndDelete({ _id: id });
    const newData = await ProductModel.find();
    return res.status(200).send({
      message: "Product Successfully fetched",
      data: newData,
      success: true,
    });
  } catch (er) {
    return res.status(500).send({ message: er.message, success: false });
  }
};

module.exports = {
  createProductController,
  getProductDataController,
  updateProductController,
  getSinglePRoductDocumentController,
  deleteSingleProductController,
};
