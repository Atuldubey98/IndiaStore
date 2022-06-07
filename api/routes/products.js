const express = require("express");
const { upload } = require("../awsSetup");

const {
  getProduct,
  getProducts,
  addProduct,
  deleteById,
  updateProduct,
  uploadImageById,
  addManyProducts,
  updateProductCategory,
} = require("../controllers/productsController");

const router = express.Router();

router.get("/", getProduct);
router.post("/" ,addProduct);
router.post(
  "/all",
  addManyProducts
);
router.delete(
  "/",
  deleteById
);
router.patch(
  "/",
  updateProduct
);
router.get(
  "/all",
  getProducts
);
router.post(
  "/upload",
  upload.single("avatar"),
  uploadImageById
);
router.post(
  "/category",
  updateProductCategory
);
module.exports = router;
