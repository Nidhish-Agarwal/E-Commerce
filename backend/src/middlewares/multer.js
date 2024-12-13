const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Here it is...", req.file);
    console.log("file", file);
    cb(null, path.join(__dirname, "./uploads"));
  },

  filename: function (req, file, cb) {
    // console.log("Here it is...");
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".png");
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
