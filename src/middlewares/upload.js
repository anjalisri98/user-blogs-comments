// src/middleware/upload.js
const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = require("../config/s3");
require("dotenv").config({ path: "./src/config/.env" });

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: "public-read",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const folder = req.body.type === "profile_image" ? "profiles" : "blogs";
      const uniqueName = `${Date.now()}-${file.originalname}`;
      cb(null, `${folder}/${uniqueName}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, 
});

module.exports = upload;
