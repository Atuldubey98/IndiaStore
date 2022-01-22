const express = require("express");
const {
  getProduct,
  getProducts,
  addProduct,
  deleteById,
  updateProduct,
} = require("../controllers/products");

const router = express.Router();

router.get("/", getProduct);
router.post("/", addProduct);
router.delete("/", deleteById);
router.patch("/", updateProduct);
router.get("/all", getProducts);

module.exports = router;
