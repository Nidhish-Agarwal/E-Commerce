const multer = require("multer");
const cloudinary = require("../utils/cloudinary.js");
const fs = require("fs");
const ProductModel = require("../models/product.model.js");
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
    const StoreProductDetails = await ProductModel.create({
      title,
      description,
      rating,
      discountedPrice,
      originalPrice,
      quantity,
      category,
      images: dataImages,
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
    return res.status(500).send({ message: er.message, success: false });
  }
};
// controller
module.exports = { createProductController };
