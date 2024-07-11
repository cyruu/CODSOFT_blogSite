const multer = require("multer");
const v4 = require("uuid");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    const newFileName = v4() + path.extname(file.originalname);
    cb(null, newFileName);
  },
});

module.exports = multer({ storage: storage });
