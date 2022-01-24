const express = require("express");
const { upload } = require("../awsSetup");

const {
  getProduct,
  getProducts,
  addProduct,
  deleteById,
  updateProduct,
  uploadImageById,
} = require("../controllers/products");

const router = express.Router();

router.get("/", getProduct);
router.post("/", addProduct);
router.delete("/", deleteById);
router.patch("/", updateProduct);
router.get("/all", getProducts);
router.post("/upload", upload.single("avatar"), uploadImageById);

module.exports = router;
