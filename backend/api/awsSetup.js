const AWS = require("aws-sdk");
const ACCESS_KEY_ID = require("../config/config").ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = require("../config/config").SECRET_ACCESS_KEY;
const REGION = require("../config/config").REGION;
const BUCKET = require("../config/config").BUCKET;

const s3 = new AWS.S3({
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
});
const multerS3 = require("multer-s3");
const multer = require("multer");

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: BUCKET,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + file.originalname);
    },
  }),
});
const documentClient = AWS.config.update({
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
  region: REGION,
});

module.exports = {
  documentClient,
  upload,
};