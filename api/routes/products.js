const express = require("express");
const { isAuthenticated } = require("../../middlewares/auth");
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
router.post("/", addProduct);
router.post("/all", isAuthenticated, addManyProducts);
router.delete("/", isAuthenticated, deleteById);
router.patch("/", isAuthenticated, updateProduct);
router.get("/all", isAuthenticated, getProducts);
router.post(
  "/upload",

  isAuthenticated,
  upload.single("avatar"),
  uploadImageById
);
router.post("/category", isAuthenticated, updateProductCategory);
module.exports = router;
